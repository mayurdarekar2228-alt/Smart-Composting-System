# Project Dimensions and Build Sequence

This register separates the dimensions needed for CAD, fabrication, and final assembly. The supplied SolidWorks files are available in [`../assets/cad/`](../assets/cad/), but a verified dimensioned drawing and as-built measurement record are not included. Do not use estimates from photographs or infer measurements from filenames.

The project brief specifies a **20-litre drum capacity**. This is a capacity, not a set of linear dimensions. All linear values below are **to be confirmed** from the approved CAD/drawings and checked against the physical model before fabrication or performance claims.

## 1. 3D Modelling and CAD Dimensions

Set the part and assembly units to millimetres, choose clear datums, and fully define the critical interfaces before creating manufacturing drawings.

| Model area | Dimensions to define and record | Source / status |
|---|---|---|
| Drum / pail | Overall length and diameter; internal diameter; wall thickness; end profile; opening and lid dimensions | `Drum_Pail_20L.SLDPRT`; values to be confirmed |
| Frame envelope | Overall length, width and height; base footprint; frame-member section; support spacing | Stand and assembly models; values to be confirmed |
| Rotating axis | Shaft / hub diameters, bearing-centre spacing, shaft projection and axis height | Assembly and interface drawings; values to be confirmed |
| Crank | Effective crank radius, grip length and swept clearance | Crank parts and assembly; values to be confirmed |
| Closures | Lid opening, hinge axis, latch / retention interface and opening clearance | Lid parts and assembly; values to be confirmed |
| Fits and clearances | Bearing/bush fits, hub-to-drum interface, running clearance and fastener locations | Detailed drawings; values and tolerances to be confirmed |

Dimension the interfaces that control fit and motion first. Use a single assembly datum scheme and include the units, revision, scale, and drawing date on each released drawing.

## 2. Fabrication Dimensions

Transfer approved CAD dimensions into a cut list and fabrication drawings before cutting or welding.

| Fabrication record | Dimensions / checks to capture | Status |
|---|---|---|
| Frame cut list | Member quantity, section, cut length, end angle and material specification | To be confirmed |
| Frame layout | Base footprint, member locations, diagonals and squareness | To be confirmed from drawing and measured build |
| Joinery | Weld / fastener locations, joint sizes, hole positions and edge distances | To be confirmed by approved process and drawing |
| Drum and supports | Bearing locations, shaft alignment, mounting points and required clearances | To be confirmed |
| As-fabricated inspection | Actual cut lengths, frame diagonals, alignment, deviations and inspection date | Record during fabrication |

Do not treat CAD values as fabrication tolerances unless the released drawing explicitly assigns them. Follow the workshop's approved procedures and qualified-operator requirements.

## 3. Final Assembly Dimensions

After assembly, record the as-built model separately from the CAD nominal dimensions.

| Assembly check | Measurement / observation to record | Status |
|---|---|---|
| Overall envelope | Assembled length, width and height | To be measured on the completed model |
| Support and axis | Base footprint, drum-axis height, bearing-centre spacing and alignment | To be measured / checked |
| Moving clearances | Drum-to-frame clearance, crank swept envelope and access around moving parts | To be measured / checked |
| Fit and retention | Hub, shaft, bearing, bush, lid and fastener interfaces | To be inspected against drawings |
| As-built comparison | Differences from the approved CAD, corrective actions and inspection date | Record after assembly |

The final assembly dimensions must come from the completed model and be compared with the released CAD. Photographs alone do not verify dimensions, fit, stability, or safe operation.
