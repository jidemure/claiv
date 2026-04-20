export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  // Simulate thinking delay and processing
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const demoResponse = `This is a simulated AI response respecting your Claiv organization and department roles. Based on the internal knowledge base, I found 3 relevant documents covering "${lastMessage}".

Here are the key takeaways:
1. **Universal Search** accesses documents universally but redacts results depending on your role.
2. **Role-Based Policies** ensure you only see answers scoped to your exact access level.
3. According to the HR guidelines, PTO requests should ideally be filed 2 weeks in advance.

[Source 1: HR PTO Policy]
[Source 2: Department Access Matrix]`;

      const parts = demoResponse.split(" ");
      
      for (let i = 0; i < parts.length; i++) {
        await new Promise((r) => setTimeout(r, 60)); // typing effect animation
        controller.enqueue(encoder.encode(parts[i] + " "));
      }
      
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
