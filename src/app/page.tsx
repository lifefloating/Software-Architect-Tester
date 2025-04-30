import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">软考架构师 AI 智能评分助手</CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            使用 AI 辅助您进行案例分析和论文的练习与评估
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-8">
          <p className="text-center text-gray-700">
            本工具旨在帮助您备考软考高级系统架构师考试。您可以输入案例分析题的解答或论文内容，系统将利用 AI 进行模拟评分，并提供反馈，助您了解自身水平，针对性提升。
          </p>
          <div className="flex space-x-4">
            <Button asChild size="lg">
              <Link href="/case-study">开始案例分析评分</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/essay">开始论文评分</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            请注意：AI 评分结果仅供参考，不能完全替代官方评分标准。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

