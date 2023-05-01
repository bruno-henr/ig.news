import Prismic from '@prismicio/client'


export function getPrismicClient(req?: unknown) {
    const prismic = Prismic.client(
        'https://ignewssk.cdn.prismic.io/api/v2',//process.env.PRISMIC_ENDPOINT as string,
        {
            req,
            accessToken: process.env.PRISMIC_ACCESS_TOKEN
        }
    )
    return prismic
}