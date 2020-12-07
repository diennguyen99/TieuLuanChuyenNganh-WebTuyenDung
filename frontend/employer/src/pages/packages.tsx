import React from "react";
import {usePackages} from "../hooks/usePackages";

export const Packages = () => {
  const { loading, data } = usePackages();
  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      {data?.packages.results?.map((p) => {
        return <h1 key={p.id}>{p.name}</h1>
      })}
    </div>
  )
}
