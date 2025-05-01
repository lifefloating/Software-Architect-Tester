"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Clock, FileText, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function EssayPage() {
  const [title, setTitle] = useState("")
  const [essay, setEssay] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 120 minutes
  const [apiKey, setApiKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async () => {
    if (!title.trim() || !essay.trim()) {
      alert('请输入论文题目和内容');
      return;
    }

    if (!apiKey.trim()) {
      alert('请输入 DeepSeek API Key');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/evaluate/essay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: title,
          content: essay,
          apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error('评分请求失败');
      }

      const data = await response.json();
      setResult(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('评分出错:', error);
      alert('评分过程中出现错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium">
            <ChevronLeft className="h-4 w-4" />
            返回首页
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">
                剩余时间: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </div>
            <Button size="sm" variant="outline" className="gap-1">
              <FileText className="h-4 w-4" />
              保存草稿
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Key 设置</CardTitle>
                <CardDescription>请输入您的 DeepSeek API Key 以启用 AI 评分功能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="apiKey">DeepSeek API Key</Label>
                    <Input
                      id="apiKey"
                      placeholder="请输入您的 DeepSeek API Key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">API Key 仅在本地使用，不会被存储或传输到其他服务器</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>论文题目</CardTitle>
                <CardDescription>请输入您要练习的论文题目</CardDescription>
              </CardHeader>
              <CardContent>
                <Input 
                  placeholder="请输入论文题目..." 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>答题区</CardTitle>
                <CardDescription>请根据论文题目要求，完成您的论文</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="请在此输入您的论文内容..."
                  className="min-h-[500px] resize-none"
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                  disabled={isSubmitted}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">{essay.length} 字 (建议字数: 1500-2000字)</div>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitted || loading || essay.trim().length === 0 || !apiKey}
                  className="gap-1"
                >
                  <Send className="h-4 w-4" />
                  {loading ? '评分中...' : '提交论文'}
                </Button>
              </CardFooter>
            </Card>

            {loading && (
              <Card>
                <CardHeader>
                  <CardTitle>AI 评分结果</CardTitle>
                  <CardDescription>AI 正在评估您的论文...</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">评分中，请稍候...</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isSubmitted && result && !loading && (
              <Card>
                <CardHeader>
                  <CardTitle>AI 评分结果</CardTitle>
                  <CardDescription>基于您的论文，AI系统给出以下评分和反馈</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">总体评分</span>
                      <span className="font-bold text-lg">{result.user_score}/{result.total_score} ({result.passed ? '及格' : '不及格'})</span>
                    </div>
                    <Progress value={(result.user_score / result.total_score) * 100} className="h-2" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">切题性</span>
                        <span className="font-medium">18/20</span>
                      </div>
                      <Progress value={90} className="h-1.5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">内容结构</span>
                        <span className="font-medium">25/30</span>
                      </div>
                      <Progress value={83} className="h-1.5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">技术深度</span>
                        <span className="font-medium">17/20</span>
                      </div>
                      <Progress value={85} className="h-1.5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">表达质量</span>
                        <span className="font-medium">12/15</span>
                      </div>
                      <Progress value={80} className="h-1.5" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">详细评价:</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">切题性评价:</p>
                          <p className="text-gray-500">{result.feedback.topic_relevance}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">内容与结构评价:</p>
                          <p className="text-gray-500">{result.feedback.content_structure}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">技术深度评价:</p>
                          <p className="text-gray-500">{result.feedback.technical_depth}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">文字表达评价:</p>
                          <p className="text-gray-500">{result.feedback.writing_quality}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">改进建议:</p>
                          <p className="text-gray-500">{result.feedback.suggestions}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">总体评价:</p>
                          <p className="text-gray-500">{result.feedback.overall}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => setIsSubmitted(false)}>重新作答</Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>论文写作指南</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium mb-1">论文结构:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-500">
                    <li>引言: 阐述选题背景和意义</li>
                    <li>主体: 分析问题、提出方案</li>
                    <li>案例: 结合实际案例进行分析</li>
                    <li>结论: 总结观点和展望</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-1">评分标准:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-500">
                    <li>内容深度: 30分</li>
                    <li>结构逻辑: 30分</li>
                    <li>案例分析: 20分</li>
                    <li>技术准确性: 20分</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>相关学习资料</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="https://github.com/xxlllq/system_architect"
                  target="_blank"
                  className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md text-sm"
                >
                  系统架构设计师复习资料
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2024 软考AI评分系统. 版权所有.
          </p>
          <Link href="https://github.com/lifefloating" className="text-sm text-gray-500 hover:underline">
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  )
}

