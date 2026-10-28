# 🌱 Smart Composting System

**https://mayurdarekar2228-alt.github.io/Smart-Composting-System/**

**Arduino-based monitoring and motor-assisted mixing for a nominal 10 L composting prototype.**

A student engineering project that brings together mechanical design, embedded control and organic-waste management. The system is intended to observe local temperature and moisture conditions and assist mixing through a DC-motor-driven paddle assembly.

<p align="center">
  <img src="assets/images/01_complete_isometric.png" alt="Conceptual CAD view of the smart composting system with a lid, external electronics enclosure and lower access cover" width="680">
</p>

<p align="center"><em>Conceptual CAD illustration. The drawings are not verified as a dimensionally accurate 10 L build.</em></p>

> **Project status:** The team has supplied its component list and CAD illustrations. This package documents the design and proposed operation; it does not include verified firmware, a validated wiring schematic or measured composting results.

[Overview](#overview) · [Team](#project-team) · [Hardware](#hardware) · [Architecture](#system-architecture) · [Working principle](#working-principle) · [CAD gallery](#cad-gallery) · [Validation](#validation-plan) · [References](#references)

---

## Overview

Managing a small compost batch requires suitable organic material, oxygen, moisture and time. Manual observation and mixing can be inconsistent. This project explores a compact system that combines a **10 L bucket**, **Arduino Uno**, **DHT11**, **soil moisture sensor**, **L298N motor driver** and **775 DC motor**.

The intended arrangement uses an upper composting chamber, a partition plate, a lower drive space and an external electronics enclosure. Sensor information supports observation; the motor and paddle assembly are intended to reduce manual stirring effort.

| Item | Project detail |
|---|---|
| Container | Nominal 10 L bucket, as specified by the team |
| Controller | Arduino Uno |
| Sensing | DHT11 and soil moisture sensor |
| Actuation | 775 DC motor with L298N driver |
| Specified supply | 12 V / 2 A DC adapter and a voltage regulator |
| Mechanical concept | Partitioned vessel with a vertical shaft and paddles |
| Documentation | 24-slide presentation and 18 CAD images |
| Validation status | Electrical compatibility, firmware behavior and composting performance remain unverified |

**Capacity note:** A 10 L bucket does not provide 10 L of usable compost volume after allowance for the partition, motor region, mixer and operating freeboard.

### Design objectives

- Observe local temperature and relative wetness conditions.
- Integrate sensor inputs and motor commands using an Arduino Uno.
- Assist mixing using a driven shaft-and-paddle mechanism.
- Organize the electronics outside the wet composting chamber.
- Provide a compact platform for learning, testing and further development.

“Smart” refers to the intended sensing and control integration. It does **not** imply that Wi-Fi, automatic watering, heating, maturity detection or unattended operation has been implemented.

## Project team

| Member | Name | PRN |
|---|---|---|
| 1 | **Mayur Santosh Darekar** | **2126UMEM1024** |
| 2 | **Sairaj Hon** | **2126UMEM1012** |
| 3 | **Abhinav Bothe** | **Not provided** |
| 4 | **Pratik Bankar** | **2126UMEM1022** |

## Presentation and documentation

- [Download the editable project presentation](docs/Smart_Composting_System_Project.pptx)
- [View the PDF presentation](docs/Smart_Composting_System_Project.pdf)
- [Browse the CAD gallery](#cad-gallery)

The companion download package contains this document, all 18 original CAD images and both presentation formats. Keep its relative folder structure intact when extracting or uploading it to a repository so the links and images work. No native CAD model, firmware or test dataset is included in this documentation package.

## Hardware

The following components were reported by the team. Quantities, supplier part numbers and costs were not supplied.

| Component | Intended role | Important detail to confirm |
|---|---|---|
| Arduino Uno | Read sensors and issue control commands | Final pin assignments and power arrangement |
| L298N motor driver | Interface the controller to the DC motor | Exact module, jumper settings, thermal limits and current capability |
| Voltage regulator | Supply regulated power to the electronics | Model, output voltage, current rating and heat dissipation |
| 12 V / 2 A adapter | Supply DC electrical power | Suitability for motor starting and the total connected load |
| 10 L bucket | Hold the composting mechanism and material | Usable chamber volume, material and mounting details |
| Partition plate | Separate the upper chamber from the proposed lower drive area | Attachment, shaft opening and liquid sealing |
| 775 DC motor | Provide rotation for mixing | Exact variant, rated voltage, speed, torque and start/stall current |
| DHT11 | Measure local air temperature and relative humidity | Placement, environmental exposure and actual device specification |
| Soil moisture sensor | Indicate relative wetness | Sensor type, output interface and calibration in the actual material |
| Jumper wires | Make prototype signal connections | Suitable only where their wire and connector ratings are adequate |

**Shown in CAD but not confirmed in the supplied hardware list:** LCD display, detailed mixer parts, coupling/seal arrangement, enclosure and any speed-reduction hardware. Their appearance in a rendering does not establish an installed or tested implementation.

## System architecture

```mermaid
flowchart LR
    DHT["DHT11"] -->|Temperature and relative humidity| UNO["Arduino Uno"]
    SOIL["Soil moisture sensor"] -->|Relative wetness signal| UNO
    UNO -->|Motor commands| DRIVER["L298N driver"]
    DRIVER -->|Switched motor power| MOTOR["775 DC motor"]
    MOTOR --> MIXER["Shaft and paddles"]
    ADAPTER["12 V / 2 A adapter"] -.->|Motor supply: verify compatibility| DRIVER
    ADAPTER -.-> REG["Voltage regulator"]
    REG -.-> LOGIC["Regulated logic supply: verify voltage and routing"]
    LOGIC -.-> UNO
    LOGIC -.-> DHT
    LOGIC -.-> SOIL
    LOGIC -.->|Module-specific logic supply| DRIVER
```

Solid arrows show the sensing/control/drive chain. Dashed arrows show conceptual power distribution. The exact power entry points and module jumpers are deliberately not prescribed.

- The motor is driven through a suitable power stage, **never directly from an Arduino I/O pin**.
- Controller, sensors and driver need a correctly planned common signal ground.
- Sensor and logic supply voltages must match the actual boards used.
- Motor-current return paths should not rely on lightweight sensor jumper wiring.
- This is a functional diagram, **not a pin-level wiring schematic** or proof of electrical compatibility.

## Working principle

The following sequence describes the intended operating concept, not verified behavior of supplied firmware.

1. **Prepare the batch.** Add suitable organic material together with dry carbon-rich material. Leave space for mixing and airflow.
2. **Observe conditions.** Read DHT11 measurements and the soil moisture sensor's response.
3. **Evaluate inputs.** Check reading validity and apply an established operating schedule. Timing and thresholds must come from testing.
4. **Assist mixing.** Command a limited-duration motor cycle only after the drive and mechanical system are verified safe to operate.
5. **Review and adjust.** Record observations and manually adjust the material or moisture as needed.
6. **Continue biological processing.** Allow decomposition and curing; motor operation or a sensor threshold alone does not establish compost maturity.

Mixing may help redistribute material, but it does not replace an adequate air path. Composting still depends on feedstock balance, aeration, moisture and time. See the [EPA composting guidance](https://www.epa.gov/recycle/composting-home).

## Mechanical design

| Subsystem | Design intent |
|---|---|
| Bucket body | Provides the main enclosure for the process and illustrated interfaces |
| Upper chamber | Holds the organic material being mixed |
| Partition | Separates the upper chamber from the proposed lower drive region |
| Shaft and paddles | Transfer motor rotation into material movement at different heights |
| Motor mount | Supports the drive and its alignment with the shaft |
| Lid and central hatch | Provide access for loading, inspection and cleaning |
| External electronics enclosure | Organizes the illustrated controller and display arrangement |
| Lower access cover | Provides access to the illustrated drive area |

A partition is not automatically watertight. Shaft support, sealing, drainage, paddle clearance, fasteners and material suitability require detailed design and inspection. The exact motor transmission and reduction ratio were not supplied.

## CAD gallery

All 18 supplied CAD images are included. These are **design illustrations, not photographs of a tested prototype**. No dimensions, tolerances, load capacity, enclosure protection rating or interference clearance have been certified from these images.

<details>
<summary><strong>External assembly views</strong></summary>

| Complete assembly — isometric | Complete assembly — front |
|:---:|:---:|
| ![Complete assembly — isometric](assets/images/01_complete_isometric.png) | ![Complete assembly — front](assets/images/02_complete_front_lcd_side.png) |

| Complete assembly — right side | Complete assembly — left side |
|:---:|:---:|
| ![Complete assembly — right side](assets/images/03_complete_right_sensor_side.png) | ![Complete assembly — left side](assets/images/04_complete_left_vent_drain_side.png) |

**Complete assembly — top and lid**

![Complete assembly — top and lid](assets/images/05_complete_top_lid.png)

</details>

<details>
<summary><strong>Internal arrangement and drive</strong></summary>

| Transparent assembly — isometric | Transparent assembly — front |
|:---:|:---:|
| ![Transparent assembly — isometric](assets/images/06_inside_isometric_transparent_bucket.png) | ![Transparent assembly — front](assets/images/07_inside_front_transparent_bucket.png) |

| Transparent assembly — side | Motor bay and mixer drive |
|:---:|:---:|
| ![Transparent assembly — side](assets/images/08_inside_right_transparent_bucket.png) | ![Motor bay and mixer drive](assets/images/09_motor_bay_and_mixer_drive.png) |

</details>

<details>
<summary><strong>Mechanical components</strong></summary>

| Bucket body and partition | Removable lid and hatch |
|:---:|:---:|
| ![Bucket body and partition](assets/images/10_part_bucket_body_with_partition.png) | ![Removable lid and hatch](assets/images/11_part_removable_lid_and_hatch.png) |

| Motor mount and drive envelope | Mixer shaft and paddles |
|:---:|:---:|
| ![Motor mount and drive envelope](assets/images/12_part_775_motor_mount_and_reducer_space.png) | ![Mixer shaft and paddles](assets/images/13_part_mixer_shaft_paddles_seal_cassette.png) |

**Lower access cover and sensor representations**

![Lower access cover and sensor representations](assets/images/14_part_motor_access_cover_and_sensors.png)

</details>

<details>
<summary><strong>Electronics enclosure and board layout</strong></summary>

| Electronics cabinet and front panel | Simplified controller and display boards |
|:---:|:---:|
| ![Electronics cabinet and front panel](assets/images/15_part_electronics_cabinet_and_front_panel.png) | ![Simplified controller and display boards](assets/images/16_part_arduino_uno_lcd_driver_boards.png) |

| Open electronics cabinet — front | Open electronics cabinet — isometric |
|:---:|:---:|
| ![Open electronics cabinet — front](assets/images/17_cabinet_open_front_view.png) | ![Open electronics cabinet — isometric](assets/images/18_cabinet_open_isometric.png) |

</details>

## Sensor limitations

### DHT11

Typical published DHT11 specifications cover **0–50 °C** and **20–80% relative humidity**; confirm the exact device datasheet.

- It measures the conditions at the sensor, not necessarily the compost core.
- It is not a waterproof immersion probe and should be protected from wet material and condensation.
- Relative air humidity is **not** the moisture content of solid compost.
- Hot or very humid composting conditions may exceed its useful operating range.

A suitably rated, protected temperature probe is a potential upgrade when reliable core-temperature measurement is required.

### Soil moisture sensor

The sensor type was not specified. Treat its output as an indicator of relative wetness until it has been calibrated in representative material. Record repeatable dry, damp and wet responses. Raw readings should not be reported as an exact water-content percentage without a justified calibration method. Check durability and drift; corrosion is a concern for exposed resistive probes.

## Power and safety

> **Compatibility warning:** “775” does not uniquely specify a motor. Do not assume that a 12 V / 2 A adapter and a common L298N module can safely start or drive the actual motor under compost load.

Before powered testing:

- Identify the exact motor and check starting, running and stall-current requirements against the supply, driver and wiring.
- Account for the L298N's voltage drop and heat dissipation. Module cooling and duty cycle affect usable current capability.
- Confirm the regulator's output voltage, polarity, current capability and temperature rise. Check module power jumpers before connecting boards together.
- Use appropriately rated conductors, connectors and circuit protection for motor current; do not assume ordinary jumper wires are suitable.
- Keep the adapter and all mains connections away from liquid. Use an intact, appropriately rated enclosed adapter; do not modify its mains circuitry.
- Isolate electronics from wet waste and protect the shaft penetration against leakage.
- Guard rotating parts and provide an accessible means to disconnect power. Keep hands and tools out of the chamber during operation.
- Disconnect power and wait for all motion to stop before opening, cleaning or servicing.
- Use a suitable guarded, current-limited test arrangement. Do not deliberately stall an unprotected motor.

A lid interlock, overload protection and a verified safe-start condition are recommended improvements. They were not included in the supplied installed-component list.

## Firmware and interfaces

**No verified firmware or final pin map is included in this package.** The intended development platform is the Arduino toolchain, but the actual source code, library versions and upload configuration must be documented when available.

| Interface | Information still needed |
|---|---|
| DHT11 input | Board variant, data pin, pull-up arrangement and read interval |
| Soil moisture input | Sensor model, output type, input pin and calibration data |
| Motor driver | Control-pin mapping, enable/PWM arrangement and power-jumper configuration |
| Power inputs | Confirmed supply path for each board and regulator settings |
| LCD, if installed | Display model, interface, wiring and library |

Recommended firmware behavior to implement and verify:

- Motor output disabled during startup and reset.
- Bounded motor run time and a documented mixing interval.
- Sensor validity checks and clear handling of disconnected or failed sensors.
- Timing that permits ongoing input checks rather than long, blocking delays.
- Calibration values that are traceable to test conditions.
- A documented safe state for faults and power interruptions.

Do not copy arbitrary pin numbers, moisture thresholds, PWM values or mixing durations into the build without checking the actual hardware and load.

## Validation plan

**No measured test results were supplied.** The checklist below is a proposed verification plan, not a record of completed tests.

- [ ] Confirm component identities, ratings and the final schematic.
- [ ] Verify wiring continuity, polarity and separation from wet areas with power disconnected.
- [ ] Check controller/sensor power and behavior before attaching the mechanical load.
- [ ] Compare temperature measurements with an appropriate reference.
- [ ] Calibrate moisture response in representative material.
- [ ] Check shaft alignment, paddle clearance, mounting and sealing.
- [ ] Conduct guarded empty and progressively loaded mixing tests using a suitable power setup.
- [ ] Measure motor current, supply sag and driver/regulator temperature rise.
- [ ] Verify startup, reset, fault and shutdown behavior.
- [ ] Record a composting trial over time, including batch inputs, interventions and maturation observations.

| Test area | Evidence to collect | Current documentation status |
|---|---|---|
| Temperature sensing | Reference comparison, repeatability and placement | Not supplied |
| Moisture response | Calibration samples and raw readings | Not supplied |
| Mechanical mixing | Clearance, mixing observations and jam behavior | Not supplied |
| Electrical loading | Start/run current, supply voltage and thermal observations | Not supplied |
| Liquid isolation | Inspection of leakage paths and enclosure protection | Not supplied |
| Composting performance | Batch history, observations and maturity assessment | Not supplied |

Use recorded evidence before claiming reduced composting time, lower energy consumption, odor elimination or improved compost quality. A small 10 L unit is not guaranteed to reach thermophilic conditions or sanitize the material.

## Expected benefits and applications

The project is intended to support:

- **Better visibility:** condition readings that help users observe a batch.
- **Reduced manual effort:** assisted mixing, subject to drive validation.
- **Practical learning:** integration of mechanical design, sensing and control.
- **Small-scale demonstration:** student laboratories and household-scale experimentation.

These are intended benefits, not validated performance guarantees. The documented design is not presented as a commercial, unattended or production-ready appliance.

## Roadmap

- [ ] Document the final wiring, firmware, component variants and actual build photographs.
- [ ] Select a motor transmission, driver and supply based on measured torque and current needs.
- [ ] Improve temperature sensing and moisture calibration.
- [ ] Add verified lid interlocking and overload protection.
- [ ] Refine shaft support, liquid sealing and maintainability.
- [ ] Add local data logging or optional wireless monitoring.
- [ ] Evaluate controlled watering or ventilation only with suitable additional hardware.
- [ ] Publish repeatable test results and an evidence-based operating procedure.

## Contributions and reuse

Useful contributions include clearer assembly documentation, verified schematics, calibration data, firmware review and reproducible test observations. Distinguish a proposal from an implemented change, identify the hardware tested and update the documentation when the design changes.

**License:** No license has been selected by the team. This documentation does not apply an open-source license to the design, images or future firmware. The team should confirm ownership and choose appropriate terms before redistribution or accepting external contributions.

## References

1. [Arduino UNO R3 documentation](https://docs.arduino.cc/hardware/uno-rev3/) — controller capabilities and board information.
2. [STMicroelectronics L298 datasheet](https://www.st.com/resource/en/datasheet/l298.pdf) — driver characteristics, electrical limits and thermal considerations.
3. [Adafruit DHT sensor guide](https://learn.adafruit.com/dht/overview) — DHT11 characteristics and limitations.
4. [US EPA: Composting At Home](https://www.epa.gov/recycle/composting-home) — composting inputs, moisture, aeration and process guidance.
5. Project-team inputs — member details, stated hardware and 18 supplied CAD illustrations.

---

**Smart Composting System**  
*Observe conditions. Assist mixing. Validate performance.*
