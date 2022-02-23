import * as React from 'react'
import {action, makeObservable, observable} from "mobx"
import { DetailImageType, ImageType, ResponseImagesType, TagType} from "../../tools/ImageType";
import NET from '../../service/restAPI/netService'
import netConnect from "../../service/connectionService";
import AsyncStorage from '@react-native-async-storage/async-storage'

const cacheImages = 'Cache Images'
const cacheDetail = 'Cache Detail'

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
            totalSearchPhoto: observable,
            connection: observable,
            checkConnect: action,
            cacheImage: observable,
            cacheDetails: observable,
            getCacheData: action
        })
        this.checkConnect()
        this.initImageArray()
    }

    connection = false
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
    cacheImage: ImageType[] = []
    cacheDetails: DetailImageType = undefined


    getCacheData = async (typeCache) => {
        try{
            const value = await AsyncStorage.getItem(typeCache)
            if (value != null){
                if (typeCache === cacheImages){
                    this.cacheImage = JSON.parse(value)

                }else {
                    this.cacheDetails = JSON.parse(value)
                }
            }
        }catch (error){
            console.log(error)
        }
    }

    setCacheData = async (data: any, typeCache) => {
        try{
            let value = await AsyncStorage.getItem(typeCache)
            if(value != null){
                await AsyncStorage.removeItem(typeCache)
                await AsyncStorage.setItem(typeCache, JSON.stringify(data))
            }else{
                await AsyncStorage.setItem(typeCache, JSON.stringify(data))
            }

        }catch (error) {
            console.log(error)
        }
    }

    checkConnect = () => {
        netConnect().then(connect => {
            this.connection = connect
        })
    }

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
            this.currentDetail = response.data
            this.setCacheData(this.currentDetail,cacheDetail)
            this.setIsDataLoaded(true)
        }).catch(error => {
            this.getCacheData(cacheDetail)
            this.setIsDataLoaded(true)
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
        }).catch(error => {
            console.warn('search error', error)
        })
    }

    //TODO избавиться от повторяющейся функции
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
            this.setCacheData(this.images,cacheImages)
        }).catch(error => {
            this.getCacheData(cacheImages)
            this.setIsDataLoaded(true)
            console.warn('search error', error)
        })

    }
}

export default MainStore