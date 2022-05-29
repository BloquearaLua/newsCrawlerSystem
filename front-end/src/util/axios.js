import { httpRequest } from 'axios'

export function getInit(params) {
    return httpRequest({
        url: '/api',
        method: 'get',
        params,
        cache: {
            m: 5,
            h: 1
        }
    })
}