import React, { useEffect, useState } from 'react'
import styles from './Home.module.sass'
import useFetch from '../../hooks/useFetch'
import { MapContainer, TileLayer } from 'react-leaflet'
import MarkerPosition from '../MarkerPosition/MarkerPosition'

const Home = () => {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEO_API_KEY}&ipAddress=`
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/

    const [IPAddress, setIPAddress] = useState("")
    const [err, setErr] = useState("")
    const {data, loading, error, setUrl} = useFetch()

    const handleInputChange = (e) => {
        setIPAddress(e.target.value)
    }

    const fetchSearchAddress = () => {
        if(ipRegex.test(IPAddress)) {
            setUrl(url+IPAddress)
            setErr('')
            setIPAddress('')
        } else {
            setErr("Invalid IP address")
            return false
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        fetchSearchAddress()
    }

    useEffect(() => {
        setUrl(url)
    }, [])

  return (
    <div className="wrapper">
        <header className={styles.header}>
            <div className={styles.header__block}>
                <h1 className={styles.header__heading}>IP Address Tracker</h1>
                <form onSubmit={handleFormSubmit} className={styles.header__form}>
                    <div className={styles.header__inputBlock}>
                        <input type="text" required name="ip-address" id="ip-address" placeholder="Search for any IP address or domain" value={IPAddress} onChange={handleInputChange} className={err ? `${styles.header__input} ${styles.header__input_error}` : `${styles.header__input}`} />
                        <button type="submit" className={styles.header__btn}><svg viewBox="0 0 320 512" width="18" height="18" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/></svg></button>
                    </div>
                    {err ? <span className={styles.header__formError}>{err}</span> : ''}
                </form>
            </div>
            <div className={styles.header__results}>
                <div className={styles.header__results_inner}>
                    <div className={styles.header__results_each}>
                        <small className={styles.header__results_title}>IP Address</small>
                        <p className={styles.header__results_value}>{data?.ip}</p>
                    </div>
                    <div className={styles.header__results_each}>
                        <small className={styles.header__results_title}>Location</small>
                        <p className={styles.header__results_value}>{data?.location?.region}</p>
                    </div>
                    <div className={styles.header__results_each}>
                        <small className={styles.header__results_title}>Time Zone</small>
                        <p className={styles.header__results_value}>{data?.location?.timezone}</p>
                    </div>
                    <div className={styles.header__results_each}>
                        <small className={styles.header__results_title}>ISP</small>
                        <p className={styles.header__results_value}>{data?.isp}</p>
                    </div>
                </div>
            </div>
        </header>
        <div>
        {data && (
            <MapContainer center={[data.location.lat, data.location.lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerPosition data={data} />
            </MapContainer>
        )}
        </div>
    </div>
  )
}

export default Home