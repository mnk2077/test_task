import * as React from 'react'
import {observer} from 'mobx-react'
import {action, computed, makeAutoObservable, makeObservable, observable} from "mobx"
import {ImageType} from "../../tools/imageType";


class MainStore {
    constructor() {
        makeObservable(this, {
            images: observable,
            isDataLoaded: observable,
            initImageArray: action,
            setIsDataLoaded: action,
            currentImage: observable,
            setCurrentImage: action,
        })
        this.initImageArray()
    }

    currentImage: ImageType = null
    isDataLoaded = false
    images: ImageType[] = []

    setCurrentImage = (id: number) => {
        //TODO найти по id нужную картинку через API и установить в currentImage
    }

    setIsDataLoaded = (value: boolean) => {
        this.isDataLoaded = value
    }

    initImageArray = () => {
        this.setIsDataLoaded(true)
        //TODO добавить загрузку данных через API
        this.images = [
            {
                id: 0,
                uri: 'https://live.staticflickr.com/65535/51795245849_28c72bd84f_b.jpg',
                title: 'firstImage',
                description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.',
                author: 'firstAuthor',
                authorImage: '',
                statistic: 'somethingStat'
            },
            {
                id: 1,
                uri: 'https://live.staticflickr.com/65535/51804885228_6c1b5abaa5_b.jpg',
                title: 'secondImage',
                description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.',
                author: 'secondAuthor',
                authorImage: '',
                statistic: 'somethingStat'
            }
        ]

    }
}

export default MainStore