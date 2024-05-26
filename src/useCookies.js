import React from "react";
import Cookies from 'js-cookie'

const useCookies = () => {

    const setCookie = (key, val, expires = 1) => {
        Cookies.set(`${key}`, JSON.stringify(val), { expires })
    }

    const deleteCookie = (key) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                Cookies.remove(`${key}`)
                resolve()
            }, 0)
        })
    }

    const getCookie = (key) => {
        const cookie = Cookies.get(`${key}`)
        return cookie ? JSON.parse(cookie) : null
    }

    const syncCookie = (key, val) => {
        const currentCookie = getCookie(key)
        if (currentCookie && currentCookie[key] === val) {
            return "synced"
        } else {
            setCookie(key, val)
            return "synced"
        }
    }

    return { setCookie, deleteCookie, getCookie, syncCookie }
}

export default useCookies;