 
 import React from "react";


 

const ArcPositions = {
    fullArcView: -20,
    partialArcView: -100,
} as const; 

type ArcPositions = typeof ArcPositions[keyof typeof ArcPositions];
 

const x1: ArcPositions = ArcPositions.fullArcView;
let x2: ArcPositions = ArcPositions.partialArcView;

export default ArcPositions;


