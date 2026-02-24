"use client";

import { useState, useEffect } from "react";
import { PrayerTimesResponse } from "@/shared/types/api";

const DEFAULT_LAT = -7.4243;
const DEFAULT_LNG = 109.2391;

export const usePrayerTimes = () => {
  const [data, setData] = useState<PrayerTimesResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Gagal ambil lokasi, gunakan default:", err);
          setCoords({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
          setCity("Purwokerto");
        }
      );
    } else {
      setCoords({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
      setCity("Purwokerto");
    }
  }, []);

  useEffect(() => {
    if (!coords) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const date = new Date();
        const timestamp = Math.floor(date.getTime() / 1000);

        const prayerRes = await fetch(
          `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${coords.lat}&longitude=${coords.lng}&method=20`
        );
        const prayerData = await prayerRes.json();
        setData(prayerData.data);

        if (!city || city === "Purwokerto") {
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
            );
            const geoData = await geoRes.json();

            const detectedCity =
              geoData.address.city ||
              geoData.address.town ||
              geoData.address.village ||
              geoData.address.county ||
              "Purwokerto";

            setCity(detectedCity);
          } catch (geoError) {
            console.error("Gagal reverse geocode", geoError);
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan sistem"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coords]);

  return { data, loading, error, coords, city };
};
