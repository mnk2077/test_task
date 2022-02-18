import * as React from 'react'
import {action, makeObservable, observable} from "mobx"
import { DetailImageType, ImageType, ResponseImagesType, TagType} from "../../tools/ImageType";
import NET from '../../service/restAPI/netService'


class MainStore {
    constructor() {
        makeObservable(this, {
            images: observable,
            isDataLoaded: observable,
            initImageArray: action,
            setIsDataLoaded: action,
            currentImage: observable,
            setCurrentImage: action,
            isRefresh: observable,
            setRefresh: action,
            loadMoreImages: action,
            totalPhoto: observable,
            currentDetail: observable,
            searchImages: observable,
            goSearch: action,
            totalSearchPhoto: observable
        })
        this.initImageArray()
    }

    searchImages: ImageType[] = []
    currentDetail: DetailImageType = undefined
    totalPhoto = 0
    totalSearchPhoto = 0
    currentPage = 1
    currentSearchPage = 1
    isRefresh = false
    currentImage: ImageType = null
    isDataLoaded = false
    images: ImageType[] = []

    setRefresh = (value: boolean) => {
        this.isRefresh = value
    }

    setCurrentImage = (id: string) => {
        this.isDataLoaded = true
        NET.get(``, {
            params: {
                method: 'flickr.photos.getInfo',
                photo_id: id,
            }
        }).then(response => {
            console.log(response.data)
            this.currentDetail = response.data
            this.setIsDataLoaded(true)
        }).catch(error => {
            console.warn('search error', error)
        })
    }

    goSearch = (text: string) => {
        if (text === '') {
            this.searchImages = []
            return
        }
        NET.get(``, {
            params: {
                method: 'flickr.photos.getRecent',
                extras: 'url_s',
                per_page: 100,
                page: 1,
            }
        }).then(response => {
            this.searchImages = response.data.photos.photo.filter(item => item.title.indexOf(text) > -1)
            this.setIsDataLoaded(true)
            this.currentSearchPage = response.data.photos.page
            this.totalSearchPhoto = response.data.photos.total
            console.log(this.totalSearchPhoto)
        }).catch(error => {
            console.warn('search error', error)
        })
    }

    loadMoreSearchImages = (text: string) => {
        NET.get(``, {
            params: {
                method: 'flickr.photos.getRecent',
                extras: 'url_s',
                per_page: 100,
                page: this.currentSearchPage + 1,
            }
        }).then(response => {
            this.searchImages.push(...response.data.photos.photo.filter(item => item.title.indexOf(text) > -1))
            this.setRefresh(false)
            this.currentSearchPage = this.currentSearchPage + 1
        }).catch(error => {
            console.warn('search error', error)
        })
    }

    loadMoreImages = () => {
        NET.get(``, {
            params: {
                method: 'flickr.photos.getRecent',
                extras: 'url_s',
                per_page: 30,
                page: this.currentPage + 1,
            }
        }).then(response => {
            //TODO избавиться от повторяющихся картинок на сервере
            this.images.push(...response.data.photos.photo)
            this.setRefresh(false)
            this.currentPage = this.currentPage + 1
        }).catch(error => {
            console.warn('search error', error)
        })
    }

    setIsDataLoaded = (value: boolean) => {
        this.isDataLoaded = value
    }

    initImageArray = () => {
        NET.get(``, {
            params: {
                method: 'flickr.photos.getRecent',
                extras: 'url_s',
                per_page: 30,
                page: 1,
            }
        }).then(response => {
            this.images = response.data.photos.photo
            this.setIsDataLoaded(true)
            this.currentPage = response.data.photos.page
            this.totalPhoto = response.data.photos.total
            console.log(this.totalPhoto)
        }).catch(error => {
            console.warn('search error', error)
        })

    }
}

export default MainStore