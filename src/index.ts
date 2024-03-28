/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const originUrl = new URL(request.url);
		const url = originUrl.searchParams.get('url');
		if (!url) {
			return new Response('url is required', { status: 400 });
		}

		try {
			const response = await fetch(url);
			const html = await response.text();

			const ogpData: { [key: string]: string } = {};
			const ogMetaRegex = /<meta\s+(property="(og:[^"]+)"\s+content="([^"]+)"|content="([^"]+)"\s+property="(og:[^"]+)")/gi;
			let match;

			while ((match = ogMetaRegex.exec(html)) !== null) {
				const property = match[2] || match[5];
				const content = match[3] || match[4];
				if (property && content) {
					ogpData[property] = content;
				}
			}

			const headers = new Headers({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*', // すべてのオリジンからのアクセスを許可
				'Access-Control-Allow-Methods': 'GET, POST', // 許可するHTTPメソッド
				'Access-Control-Allow-Headers': 'Content-Type' // 許可するヘッダー
			});

			return new Response(JSON.stringify(ogpData), {
				headers,
			});
		} catch (error) {
			console.error('Error fetching OGP:', error);
			return new Response('Error fetching OGP', { status: 500 });
		}
	}
};
