import { Issuer, custom } from "openid-client";

let oidcClient = null;

export async function getOIDCClient() {
  if (oidcClient) return oidcClient;

  const issuerUrl = process.env.OIDC_ISSUER;
  const clientId = process.env.OIDC_CLIENT_ID;
  const clientSecret = process.env.OIDC_CLIENT_SECRET;
  const redirectUri = process.env.OIDC_REDIRECT_URI;

  if (!issuerUrl || !clientId || !clientSecret) {
    console.warn("⚠️ OIDC not fully configured. Using Mock Mode.");
    return null;
  }

  try {
    custom.setHttpOptionsDefaults({
      timeout: 10000,
    });
    const issuer = await Issuer.discover(issuerUrl);
    oidcClient = new issuer.Client({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uris: [redirectUri],
      response_types: ["code"],
    });
    return oidcClient;
  } catch (error) {
    console.error("❌ Failed to initialize OIDC client:", error.message);
    return null;
  }
}
