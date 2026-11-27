import { readFile, writeFile } from "node:fs/promises";
import { geoArea } from "d3-geo";

const sourcePath = new URL("../data/source/ctprvn.geojson", import.meta.url);
const outputPath = new URL("../public/regions-8.geojson", import.meta.url);
const selectedCodes = new Set(["41", "43", "44", "45", "46", "47", "48", "51"]);
const source = JSON.parse(await readFile(sourcePath, "utf8"));

const features = source.features
  .filter((feature) => selectedCodes.has(String(feature.properties.CTPRVN_CD)))
  .map((feature) => {
    if (feature.geometry.type !== "MultiPolygon") return feature;

    const coordinates = feature.geometry.coordinates.map((polygon) => {
      const sphericalArea = geoArea({ type: "Polygon", coordinates: polygon });
      if (sphericalArea <= 2 * Math.PI) return polygon;

      // This source contains one tiny outer ring with the opposite winding.
      return polygon.map((ring, index) => index === 0 ? [...ring].reverse() : ring);
    });

    return { ...feature, geometry: { ...feature.geometry, coordinates } };
  });

if (features.length !== 8) {
  throw new Error(`Expected 8 province boundaries, found ${features.length}.`);
}

await writeFile(outputPath, JSON.stringify({ type: "FeatureCollection", features }));
console.log(`Prepared ${features.length} province boundaries in public/regions-8.geojson.`);
