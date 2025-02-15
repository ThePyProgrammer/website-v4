import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';

function FloatingIcon({ position, icon, delay = 0 }: { position: [number, number, number], icon: string, delay?: number }) {
  const meshRef = useRef<Mesh>(null);
  
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    delay: delay * 1000,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() + delay) * 0.2;
    }
  });

  return (
    <animated.mesh ref={meshRef} position={position} scale={scale}>
      <Text
        color="white"
        fontSize={0.5}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>
    </animated.mesh>
  );
}

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <FloatingIcon position={[-2, 0, 0]} icon="🧠" delay={0} />
      <FloatingIcon position={[0, 0, 0]} icon="🧬" delay={0.2} />
      <FloatingIcon position={[2, 0, 0]} icon="❤️" delay={0.4} />
    </>
  );
}