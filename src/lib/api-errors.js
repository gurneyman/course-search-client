// Because Fetch doesn't recognize errors since it completed the response
export function handleApiErrors (response) {
    console.log("RESPONSE", response)
    if (!response.ok) throw Error(response.statusText)
    return response
}