'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

export default function CaseStudyPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim()) {
      alert('请输入题目和解答');
      return;
    }

    if (!apiKey.trim()) {
      alert('请输入 DeepSeek API Key');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/evaluate/case-study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
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
            <CardTitle className="text-2xl font-bold text-gray-800">案例分析评分</CardTitle>
            <CardDescription>
              输入案例分析题目和您的解答，AI 将根据软考评分标准进行评估
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
              <Label htmlFor="question">案例分析题目</Label>
              <Textarea
                id="question"
                placeholder="请输入案例分析题目..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">您的解答</Label>
              <Textarea
                id="answer"
                placeholder="请输入您的解答..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={10}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubmit} 
              disabled={loading || !question.trim() || !answer.trim() || !apiKey.trim()}
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
              <CardDescription>AI 正在评估您的解答...</CardDescription>
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
                <Label>优点</Label>
                <Alert>
                  <AlertDescription>
                    {result.feedback.strengths}
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-2">
                <Label>不足之处</Label>
                <Alert>
                  <AlertDescription>
                    {result.feedback.weaknesses}
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
