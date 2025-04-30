
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'; // Use Input for topic
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

export default function EssayPage() {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = async () => {
    if (!topic.trim() || !content.trim()) {
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
          topic,
          content,
          apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error('评分请求失败');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('评分出错:', error);
      alert('评分过程中出现错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="w-full max-w-4xl px-4">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">返回首页</Link>
          </Button>
        </div>

        <Card className="w-full shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">论文评分</CardTitle>
            <CardDescription>
              输入论文题目和您的论文内容，AI 将根据软考评分标准进行评估
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiKey">DeepSeek API Key</Label>
              <Textarea
                id="apiKey"
                placeholder="请输入您的 DeepSeek API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-gray-500">API Key 仅在本地使用，不会被存储或传输到其他服务器</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">论文题目</Label>
              <Input
                id="topic"
                placeholder="请输入论文题目..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">论文内容</Label>
              <Textarea
                id="content"
                placeholder="请输入您的论文内容..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20} // Increase rows for essay content
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubmit} 
              disabled={loading || !topic.trim() || !content.trim() || !apiKey.trim()}
              className="w-full"
            >
              {loading ? '评分中...' : '提交评分'}
            </Button>
          </CardFooter>
        </Card>

        {loading && (
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">评分结果</CardTitle>
              <CardDescription>AI 正在评估您的论文...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && result && (
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">评分结果</CardTitle>
              <CardDescription>
                总分: {result.user_score}/{result.total_score} ({result.passed ? '及格' : '不及格'})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>得分情况</Label>
                <Progress value={(result.user_score / result.total_score) * 100} className="h-3" />
                <p className="text-sm text-gray-500 text-right">
                  {result.user_score}/{result.total_score} 分 ({Math.round((result.user_score / result.total_score) * 100)}%)
                </p>
              </div>

              <div className="space-y-2">
                <Label>总体评价</Label>
                <Alert>
                  <AlertDescription>
                    {result.feedback.overall}
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-2">
                <Label>切题性评价</Label>
                <Alert>
                  <AlertDescription>
                    {result.feedback.topic_relevance}
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-2">
                <Label>内容与结构评价</Label>
                <Alert>
                  <AlertDescription>
                    {result.feedback.content_structure}
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-2">
                <Label>技术深度与实践性评价</Label>
                <Alert>
                  <AlertDescription>
                    {result.feedback.technical_depth}
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-2">
                <Label>文字表达评价</Label>
                <Alert>
                  <AlertDescription>
                    {result.feedback.writing_quality}
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-2">
                <Label>改进建议</Label>
                <Alert>
                  <AlertDescription>
                    {result.feedback.suggestions}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

