export type ImageType = {
    id: string,
    owner: string,
    secret: string,
    server: string,
    farm: number,
    title: string,
    ispublic: number,
    isfriend: number,
    isfamily: number,
    url_s: string,
    height_s: number,
    width_s: number
}

export type ResponseImagesType = {
    photos: {
        page: number,
        pages: number,
        perpage: number,
        total: number,
        photo: ImageType[]
    },
    stat: string
}