import { sdk } from "@lib/config"

export const createPDF = async () => {
  const response: Response = await sdk.client.fetch("/store/pdf", {
    method: "POST",
    headers: {
      accept: "application/pdf",
    },
    // todo: dynamic body is needed for the request
    body: {
      motifId: "1424",
      motifOwnerName: "Customer 1424",
      motifName: "bear",
    },
  })

  // convert response to Binary Large Object for pdf
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  window.open(url)
  URL.revokeObjectURL(url)
}
