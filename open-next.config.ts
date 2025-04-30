// default open-next.config.ts file created by @opennextjs/cloudflare

// 修改导入方式，将 kvCache 标记为外部模块
// import cache from "@opennextjs/cloudflare/kvCache";

const config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      // 使用 dummy 缓存替代 KV 缓存
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};

export default config;
