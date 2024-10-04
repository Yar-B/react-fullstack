import {
	Viewer as CesiumViewer,
	Cartesian3,
	Color,
	CallbackProperty,
	DistanceDisplayCondition,
	SampledPositionProperty,
	createWorldTerrainAsync,
	JulianDate,
	TimeInterval,
	TimeIntervalCollection,
	PathGraphics,
	VelocityOrientationProperty,
	createOsmBuildingsAsync,
	Clock as CesiumClock
} from 'cesium';
import { useEffect, useRef, useState } from 'react';
import { CesiumComponentRef, Entity, Viewer, Clock } from 'resium';

import aircraft from '../../assets/3d-models/Cesium_Air.glb';
import { Button } from 'antd';

function Graphic() {
	const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);
	const [coords, setCoords] = useState([37.38721716903894, 55.9671868346493]);
	const [isNewLoopCreated, setIsNewLoopCreated] = useState(false);
	const [landingIsAllowed, setLandingIsAllowed] = useState(false);
	const [landingIsCompleted, setLandingIsCompleted] = useState(false);
	const [viewer, setViewer] = useState<CesiumViewer | null>(null);
	const [longitude, setLongitude] = useState(37.38721716903894);
	const [latitude, setLatitude] = useState(55.9671868346493);
	const [height, setHeight] = useState(1);
	const [isViewerMounted, setIsViewerMounted] = useState(false);
	const [modelPosition, setModelPosition] = useState(Cartesian3.fromDegrees(coords[0], coords[1], height));

	const positionProp = new SampledPositionProperty();

	const flightData = JSON.parse(
		'[{"longitude":37.34688656596474,"latitude":55.96582417895805,"height":1000},{"longitude":37.3710928000064,"latitude":55.95058369418865,"height":1000},{"longitude":37.41075325832266,"latitude":55.94692638531057,"height":1000},{"longitude":37.47918895669827,"latitude":55.95964437650196,"height":1000},{"longitude":37.495603726966465,"latitude":55.984075896350376,"height":1000},{"longitude":37.42318462579004,"latitude":56.0024565381134,"height":1000},{"longitude":37.366107884534216,"latitude":55.99345165980853,"height":1000},{"longitude":37.34688656596474,"latitude":55.96582417895805,"height":1000}]'
	);
	const landingData = JSON.parse(
		'[{"longitude":37.34688656596474,"latitude":55.96582417895805,"height":1000},{"longitude":37.36273388097844,"latitude":55.96390779213965,"height":600},{"longitude":37.375359007392426,"latitude":55.96573964287716,"height":300},{"longitude":37.385427605407195,"latitude":55.9669663951079,"height":210},{"longitude":37.406529418898906,"latitude":55.97012069045996,"height":210},{"longitude":37.42639949676888,"latitude":55.973109974513264,"height":210},{"longitude":37.43277397801342,"latitude":55.97409281774121,"height":210},{"longitude":37.43708647147036,"latitude":55.97474495051273,"height":210},{"longitude":37.43744057529817,"latitude":55.9747614369507,"height":210},{"longitude":37.441088959586075,"latitude":55.975322613146304,"height":210},{"longitude":37.441726263809876,"latitude":55.975460323858555,"height":210},{"longitude":37.44188239392765,"latitude":55.97578983874373,"height":210},{"longitude":37.44162260667257,"latitude":55.97632950107989,"height":210},{"longitude":37.441373883501974,"latitude":55.97683328851648,"height":210},{"longitude":37.44112575794727,"latitude":55.97734235250187,"height":210},{"longitude":37.44090070209687,"latitude":55.977815735875,"height":210},{"longitude":37.44060928715257,"latitude":55.978447651306986,"height":210},{"longitude":37.440362361395124,"latitude":55.978989026283664,"height":210},{"longitude":37.44010444574384,"latitude":55.97949511765103,"height":210},{"longitude":37.43994238681111,"latitude":55.97985592775733,"height":210},{"longitude":37.439769976391126,"latitude":55.98027666306228,"height":210},{"longitude":37.43964103540436,"latitude":55.980529181435735,"height":210},{"longitude":37.43954344287963,"latitude":55.980709860166776,"height":210},{"longitude":37.43938232714653,"latitude":55.98101041295769,"height":210},{"longitude":37.43913579872126,"latitude":55.981587671937376,"height":210},{"longitude":37.43899520034757,"latitude":55.98185777273624,"height":210},{"longitude":37.43855432920387,"latitude":55.98200174292227,"height":210},{"longitude":37.437943276327346,"latitude":55.98194776877436,"height":210},{"longitude":37.43733204971888,"latitude":55.981851706070856,"height":210},{"longitude":37.43667822034966,"latitude":55.981737536892695,"height":210},{"longitude":37.436528037978746,"latitude":55.9817014720293,"height":210},{"longitude":37.43637807342745,"latitude":55.98147903713942,"height":210},{"longitude":37.4365283240667,"latitude":55.98116681491443,"height":210}]'
	);
	const timeStepInSeconds = 30;
	const totalSeconds = timeStepInSeconds * (flightData.length - 1);
	let start = JulianDate.fromIso8601('2023-03-09T23:10:00Z');
	let stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate());

	const [airplaneEntity, setAirplaneEntity] = useState<any>({
		id: 'airplane',
		availability: new TimeIntervalCollection([
			new TimeInterval({
				start: start,
				stop: stop
			})
		]),
		path: new PathGraphics({
			width: 3
		}),
		position: positionProp,
		label: {
			text: new CallbackProperty(() => 'Bort #1', false),
			font: '20px sans-serif',
			showBackground: true,
			distanceDisplayCondition: new DistanceDisplayCondition(0.0, 100.0),
			eyeOffset: new Cartesian3(0, 3.5, 0)
		},
		model: {
			uri: aircraft,
			minimumPixelSize: 1,
			maximumScale: 1
		},
		orientation: new VelocityOrientationProperty(positionProp)
	});
	useEffect(() => {
		console.log('mounted');
	}, []);

	useEffect(() => {
		initState();
	}, [ref.current?.cesiumElement]);

	function addNewLoop() {
		console.log('first');
		if (ref.current?.cesiumElement) {
			const viewer = ref.current.cesiumElement;
			const totalSeconds = timeStepInSeconds * (flightData.length - 1);
			viewer.clock.stopTime = JulianDate.addSeconds(stop, totalSeconds, new JulianDate());
			const start1 = stop.clone();
			for (let i = 0; i < flightData.length; i++) {
				const dataPoint = flightData[i];
				const time = JulianDate.addSeconds(start1, i * timeStepInSeconds, new JulianDate());
				const position = Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
				airplaneEntity.position.addSample(time, position);
			}
		}
	}

	async function initState() {
		if (ref.current?.cesiumElement && !isViewerMounted) {
			console.log('sxqwqw');
			const viewer = ref.current.cesiumElement;
			const osmBuildings = await createOsmBuildingsAsync();
			viewer.scene.primitives.add(osmBuildings);
			viewer.terrainProvider = await createWorldTerrainAsync();
			setIsViewerMounted(true);
			for (let i = 0; i < flightData.length; i++) {
				const dataPoint = flightData[i];
				const time = JulianDate.addSeconds(start, i * timeStepInSeconds, new JulianDate());
				const position = Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
				airplaneEntity.position.addSample(time, position);
				viewer.entities.add({
					id: `point-${i}`,
					description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
					position: position,
					point: { pixelSize: 10, color: Color.RED }
				});
			}
			viewer.clock.stopTime = stop.clone();
			viewer.trackedEntity = viewer.entities.getById('airplane');
		}
	}

	useEffect(() => {
		setModelPosition(Cartesian3.fromDegrees(longitude, latitude, height));
	}, [longitude, latitude, height]);

	function showPositionProp() {
		console.log(positionProp.numberOfDerivatives);
	}

	function onTick(v: CesiumClock) {
		if (JulianDate.compare(stop, v.currentTime) < 0 && !isNewLoopCreated && !landingIsCompleted) {
			if (!landingIsAllowed) {
				setIsNewLoopCreated(true);
				addNewLoop();
			} else {
				doLanding();
			}
		} else {
			setIsNewLoopCreated(false);
		}
	}

	function onAllowLanding() {
		setLandingIsAllowed(true);
	}

	function doLanding() {
		console.log('landing');
		if (ref.current?.cesiumElement) {
			const viewer = ref.current.cesiumElement;
			const totalSeconds = timeStepInSeconds * (landingData.length - 1);
			viewer.clock.stopTime = JulianDate.addSeconds(stop, totalSeconds, new JulianDate());
			const start1 = stop.clone();
			for (let i = 0; i < landingData.length; i++) {
				const dataPoint = landingData[i];
				const time = JulianDate.addSeconds(start1, i * timeStepInSeconds, new JulianDate());
				const position = Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
				airplaneEntity.position.addSample(time, position);
			}
		}
		setLandingIsCompleted(true);
	}

	return (
		<>
			<div style={{ width: '100%', height: '100%' }}>
				<div style={{ width: '100%', height: '10%' }}>
					<Button onClick={onAllowLanding}>Разрешить посадку</Button>
				</div>
				<Viewer style={{ width: '100%', height: '90%' }} ref={ref}>
					<Entity {...airplaneEntity}></Entity>
					<Clock
						currentTime={start.clone()}
						startTime={start.clone()}
						multiplier={1}
						shouldAnimate={true}
						onTick={onTick}
					></Clock>
				</Viewer>
			</div>
		</>
	);
}

export default Graphic;
