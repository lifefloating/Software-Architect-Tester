import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, BarChart, GraduationCap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold text-xl">软考AI评分系统</span>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              首页
            </Link>
            <Link href="/case-study" className="text-sm font-medium transition-colors hover:text-primary">
              案例分析
            </Link>
            <Link href="/essay" className="text-sm font-medium transition-colors hover:text-primary">
              论文题
            </Link>
            <Link
              href="https://github.com/lifefloating"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              关于
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline">登录</Button>
            <Button>注册</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  软考高级系统架构师AI评分系统
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  通过AI技术辅助评分，提高备考效率，助力通过软考高级系统架构师考试
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    <FileText className="h-4 w-4" />
                    填入ApiKey
                  </Button>
                  <Button size="lg" variant="outline" className="gap-1" asChild>
                    <Link href="https://github.com/xxlllq/system_architect" target="_blank">
                      <BookOpen className="h-4 w-4" />
                      学习资料
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] aspect-video rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <BarChart className="h-24 w-24 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">主要功能</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  我们的系统提供全面的软考高级系统架构师备考辅助功能
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <FileText className="h-8 w-8" />
                  <div className="grid gap-1">
                    <CardTitle>案例分析练习</CardTitle>
                    <CardDescription>模拟真实考试环境的案例分析题</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 text-gray-500 dark:text-gray-400">
                  提供历年真题和模拟题，通过AI技术评分和分析，帮助您掌握解题技巧
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/case-study">开始练习</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BookOpen className="h-8 w-8" />
                  <div className="grid gap-1">
                    <CardTitle>论文题练习</CardTitle>
                    <CardDescription>专业的论文题目练习与评分</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 text-gray-500 dark:text-gray-400">
                  提供论文题目练习，AI评分系统给出详细的评分反馈和改进建议
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/essay">开始练习</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="case" className="w-full max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">练习示例</h2>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="case">案例分析</TabsTrigger>
                  <TabsTrigger value="essay">论文题</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="case" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>案例分析示例</CardTitle>
                    <CardDescription>以下是一个案例分析题目示例，您可以尝试解答并获取AI评分</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold mb-2">某大型电商平台系统架构设计</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          某电商平台面临高并发访问、订单处理延迟、数据一致性等问题。请分析系统现状，并从架构设计角度提出改进方案。
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Button>查看完整题目</Button>
                        <Button variant="outline">查看参考答案</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="essay" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>论文题示例</CardTitle>
                    <CardDescription>以下是一个论文题目示例，您可以尝试解答并获取AI评分</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold mb-2">浅谈微服务架构在企业应用中的实践</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          请结合实际案例，论述微服务架构在企业应用中的优势、挑战及实施策略。
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Button>开始写作</Button>
                        <Button variant="outline">查看范文</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2024 软考AI评分系统. 版权所有.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:underline">
              使用条款
            </Link>
            <Link href="#" className="hover:underline">
              隐私政策
            </Link>
            <Link href="#" className="hover:underline">
              联系我们
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

