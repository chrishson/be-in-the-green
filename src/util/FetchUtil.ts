export const FetchUtil = (body: any) => {
    return fetch(process.env.REACT_APP_HASURA_API as string, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.REACT_APP_HASURA_API_SECRET as string
        },
        body: JSON.stringify(body),
    });
}