export default {
  id: "nvidia",
  priority: 20,
  hasFree: true,
  alias: "nvidia",
  display: {
    name: "NVIDIA NIM",
    icon: "developer_board",
    color: "#76B900",
    textIcon: "NV",
    website: "https://developer.nvidia.com/nim",
    notice: {
      text: "Free access for NVIDIA Developer Program members (prototyping & testing).",
      apiKeyUrl: "https://build.nvidia.com/settings/api-keys",
    },
  },
  category: "apikey",
  authType: "apikey",
  authModes: ["apikey"],
  transport: {
    baseUrl: "https://integrate.api.nvidia.com/v1/chat/completions",
    validateUrl: "https://integrate.api.nvidia.com/v1/models",
  },
  models: [
    // Free LLM models (verified working 2026-08-28)
    // Model IDs use short names (like antigravity), upstreamModelId maps to actual NVIDIA API model ID
    { id: "nemotron-3-super-120b", name: "Nemotron 3 Super 120B", upstreamModelId: "nvidia/nemotron-3-super-120b-a12b" },
    { id: "nemotron-3-nano-30b", name: "Nemotron 3 Nano 30B", upstreamModelId: "nvidia/nemotron-3-nano-30b-a3b" },
    { id: "nemotron-3-nano-omni-30b", name: "Nemotron 3 Nano Omni 30B (Reasoning)", upstreamModelId: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning" },
    { id: "kimi-k3", name: "Kimi K3", upstreamModelId: "moonshotai/kimi-k3" },
    // Legacy models (may timeout but listed for reference)
    { id: "nemotron-3-ultra-550b", name: "Nemotron 3 Ultra 550B", upstreamModelId: "nvidia/nemotron-3-ultra-550b-a55b" },
    // Embedding models
    { id: "nv-embedqa-e5-v5", name: "NV EmbedQA E5 v5", kind: "embedding", upstreamModelId: "nvidia/nv-embedqa-e5-v5" },
    // STT models
    { id: "parakeet-ctc-1.1b", name: "Parakeet CTC 1.1B", params: ["language"], kind: "stt", upstreamModelId: "nvidia/parakeet-ctc-1.1b-asr" },
    // TTS models
    { id: "fastpitch", name: "FastPitch", kind: "tts", upstreamModelId: "fastpitch" },
    { id: "tacotron2", name: "Tacotron2", kind: "tts", upstreamModelId: "tacotron2" },
  ],
  serviceKinds: ["llm","tts","embedding"],
  ttsConfig: {
    baseUrl: "https://integrate.api.nvidia.com/v1/audio/speech",
    authType: "apikey",
    authHeader: "bearer",
    format: "nvidia-tts",
  },
  embeddingConfig: { baseUrl: "https://integrate.api.nvidia.com/v1/embeddings", authType: "apikey", authHeader: "bearer" },
};
