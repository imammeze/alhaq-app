import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng)
    return NextResponse.json({ error: "Missing data" }, { status: 400 });

  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`
    );

    const data = await res.json();

    return NextResponse.json({
      address: {
        city: data.city || data.locality || data.principalSubdivision,
        town: data.locality,
        village: data.locality,
        county: data.principalSubdivision,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Gagal" }, { status: 500 });
  }
}
