import * as React from 'react'
import {action, makeObservable, observable} from "mobx"
import {DetailImageType, ImageType, ResponseImagesType} from "../../tools/ImageType";
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
            currentDetail: observable
        })
        this.initImageArray()
    }

    currentDetail: DetailImageType = undefined
    totalPhoto = 0
    currentPage = 1
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
            const jsonData: DetailImageType = JSON.parse(response.data.slice(14, response.data.length - 1))
            console.log(jsonData)
            this.currentDetail = jsonData
            console.log(this.currentDetail)
            this.setIsDataLoaded(true)
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
            const jsonData: ResponseImagesType = JSON.parse(response.data.slice(14, response.data.length - 1))
            //TODO избавиться от повторяющихся картинок на сервере
            this.images.push(...jsonData.photos.photo)
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
            const jsonData: ResponseImagesType = JSON.parse(response.data.slice(14, response.data.length - 1))
            this.images = jsonData.photos.photo
            this.setIsDataLoaded(true)
            this.currentPage = jsonData.photos.page
            this.totalPhoto = jsonData.photos.total
            console.log(this.totalPhoto)
        }).catch(error => {
            console.warn('search error', error)
        })

    }
}

export default MainStore