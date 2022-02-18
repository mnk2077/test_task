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
export type OwnerType = {
    nsid: string,
    username: string,
    realname: string,
    location: string,
    iconserver: string,
    iconfarm: number,
    path_alias: string
}

export type TitleType = {
    _content: string
}

export type DescriptionType = {
    _content: string
}

export type VisibilityType = {
    ispublic: number,
    isfriend: number,
    isfamily: number
}

export type DatesType = {
    posted: string,
    taken: string,
    takengranularity: number,
    takenunknown: number,
    lastupdate: string
}

export type EditabilityType = {
    cancomment: number,
    canaddmeta: number
}

export type PubliceditabilityType = {
    cancomment: number,
    canaddmeta: number
}

export type UsageType = {
    candownload: number,
    canblog: number,
    canprint: number,
    canshare: number
}

export type CommentsType = {
    _content: number
}

export type NotesType = {
    note: []
}

export type PeopleType = {
    haspeople: number
}

export type TagsType = {
    tag: TagType[]
}

export type TagType = {
    id: string,
    author: string,
    authorname: string,
    raw: string,
    _content: string,
    machine_tag: number
}

export type UrlType = {
    type: string,
    _content: string
}

export type UrlsType = {
    url: UrlType[]
}

export type DetailImageType = {
    photo: {
        id: string,
        secret: string,
        server: string,
        farm: number,
        dateuploaded: string,
        isfavorite: number,
        license: number,
        safety_level: number,
        rotation: number,
        originalsecret: string,
        originalformat: string,
        owner: OwnerType,
        title: TitleType,
        description: DescriptionType,
        visibility: VisibilityType,
        dates: DatesType,
        views: number,
        editability: EditabilityType,
        publiceditability: PubliceditabilityType,
        usage: UsageType,
        comments: CommentsType,
        notes: NotesType,
        people: PeopleType,
        tags: TagsType,
        urls: UrlsType,
        media: string
    },
    stat: string
}