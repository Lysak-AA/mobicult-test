import type { Card } from '~/types/types'

export function useUpdateCardsList () {
    const newCardList = localStorage.getItem('mob-cards')
    if (!newCardList) {
       return []
    } else {
        const object = JSON.parse(newCardList)
        const arrFromObj: Ref<Array<Card>> | [] = []
        for (let item in object) {
            arrFromObj.push(object[item] as never)
        }
        return arrFromObj
    }
}