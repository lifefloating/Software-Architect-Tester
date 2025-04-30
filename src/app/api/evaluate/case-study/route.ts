import { NextRequest, NextResponse } from 'next/server';

// DeepSeek API integration
async function callDeepSeekAPI(prompt: string, apiKey: string): Promise<any> {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位经验丰富的软考高级系统架构师考试阅卷老师，擅长根据评分标准对考生的答案进行评分和反馈。请严格按照要求的JSON格式返回评分结果。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('DeepSeek API error:', errorData);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response from the model
    return JSON.parse(content);
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    
    // Fallback to mock response if API call fails
    return {
      total_score: 75,
      user_score: 60,
      passed: true,
      feedback: {
        overall: "API调用失败，返回模拟评分。实际使用时请确保API Key正确且有效。",
        strengths: "无法评估",
        weaknesses: "无法评估",
        suggestions: "请检查API Key和网络连接，然后重试。"
      }
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { question, answer, apiKey } = await req.json();

    if (!question || !answer || !apiKey) {
      return NextResponse.json({ error: '缺少题目、解答或 API Key' }, { status: 400 });
    }

    // Construct the prompt based on the design document
    const prompt = `
你是一位经验丰富的软考高级系统架构师考试阅卷老师。
请根据以下案例分析题目和考生解答，按照软考评分标准进行评分（满分75分，45分及格）。

评分标准重点关注：
1. 问题理解准确性：考生是否正确理解了案例中的问题和需求
2. 相关知识和技术的应用深度与广度：是否恰当运用了系统架构相关知识和技术
3. 解决方案的逻辑性、可行性和完整性：方案是否逻辑清晰，实际可行，考虑全面
4. 分析和解决问题的能力：是否展示了系统性思维和解决复杂问题的能力
5. 表达清晰度和专业性：是否使用了准确的专业术语，表达清晰

题目：
${question}

考生解答：
${answer}

请以 JSON 格式返回评分结果，包含以下字段：
- "total_score": 75 (固定)
- "user_score": number (你的评分，必须是45-75之间的整数，如果不及格则为0-44之间的整数)
- "passed": boolean (是否及格，user_score >= 45 为true，否则为false)
- "feedback": {
    "overall": "string (总体评价，100-150字)",
    "strengths": "string (优点，80-120字)",
    "weaknesses": "string (不足之处，80-120字)",
    "suggestions": "string (改进建议，100-150字)"
  }
`;

    // Call the DeepSeek API
    const result = await callDeepSeekAPI(prompt, apiKey);

    // Return the result from the API
    return NextResponse.json(result);

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: '处理评分请求时发生内部错误' }, { status: 500 });
  }
}
