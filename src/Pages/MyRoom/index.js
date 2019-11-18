import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

import {Water} from '../Water'

var camera, scene, renderer, light;
			var controls, water, sphere;


export default function MyRoom() {
    const threeRef = useRef(null)

    useEffect(() => {
        init()
        animate()
    }, [])

    function init(){
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        threeRef.current.appendChild( renderer.domElement );

        //

        scene = new THREE.Scene();

        //

        camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
        camera.position.set( 30, 30, 100 );

        //

        // light = new THREE.DirectionalLight( 0xffffff, 0.8 );
        // scene.add( light );

        var box = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshNormalMaterial)
        scene.add(box)

        // Water
				var waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );
				water = new Water(
					waterGeometry,
					{
						textureWidth: 512,
						textureHeight: 512,
						waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {
							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
						} ),
						alpha: 1.0,
						sunDirection: light.position.clone().normalize(),
						sunColor: 0xffffff,
						waterColor: 0x001e0f,
						distortionScale: 3.7,
						fog: scene.fog !== undefined
					}
				);
				water.rotation.x = - Math.PI / 2;
				scene.add( water );

    }

    function animate(){
        requestAnimationFrame(animate)
    }

    

    return (
        <div ref={threeRef}>Hello ,MyRoom</div>
    )
}

