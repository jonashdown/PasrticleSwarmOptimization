function particleSwarmOptimization(
  costFunction,
  bounds,
  numParticles,
  maxIterations
) {
  const numDimensions = bounds.length;
  let particles = [];
  let globalBestPosition = null;
  let globalBestCost = Infinity;

  // Initialize particles
  for (let i = 0; i < numParticles; i++) {
    let position = [];
    let velocity = [];
    for (let j = 0; j < numDimensions; j++) {
      position.push(
        bounds[j][0] + Math.random() * (bounds[j][1] - bounds[j][0])
      );
      velocity.push(
        (Math.random() - 0.5) * (bounds[j][1] - bounds[j][0]) * 0.1
      ); // Small initial velocity
    }
    particles.push({
      position: position,
      velocity: velocity,
      bestPosition: [...position],
      bestCost: costFunction(position),
    });

    if (particles[i].bestCost < globalBestCost) {
      globalBestCost = particles[i].bestCost;
      globalBestPosition = [...particles[i].position];
    }
  }

  // PSO parameters
  const inertiaWeight = 0.7;
  const cognitiveCoefficient = 1.5;
  const socialCoefficient = 1.5;

  // Optimization loop
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    for (let i = 0; i < numParticles; i++) {
      const particle = particles[i];

      // Update velocity
      for (let j = 0; j < numDimensions; j++) {
        const cognitiveVelocity =
          cognitiveCoefficient *
          Math.random() *
          (particle.bestPosition[j] - particle.position[j]);
        const socialVelocity =
          socialCoefficient *
          Math.random() *
          (globalBestPosition[j] - particle.position[j]);
        particle.velocity[j] =
          inertiaWeight * particle.velocity[j] +
          cognitiveVelocity +
          socialVelocity;

        // Clamp velocity (optional, but can help with stability)
        const velocityClamp = 0.2 * (bounds[j][1] - bounds[j][0]);
        particle.velocity[j] = Math.max(
          -velocityClamp,
          Math.min(velocityClamp, particle.velocity[j])
        );
      }

      // Update position
      for (let j = 0; j < numDimensions; j++) {
        particle.position[j] += particle.velocity[j];

        // Handle boundary constraints (e.g., reflection)
        if (particle.position[j] < bounds[j][0]) {
          particle.position[j] =
            bounds[j][0] + Math.random() * (bounds[j][1] - bounds[j][0]) * 0.1;
          particle.velocity[j] *= -0.5; // Reduce and reverse velocity
        } else if (particle.position[j] > bounds[j][1]) {
          particle.position[j] =
            bounds[j][1] - Math.random() * (bounds[j][1] - bounds[j][0]) * 0.1;
          particle.velocity[j] *= -0.5; // Reduce and reverse velocity
        }
      }

      // Evaluate cost
      const currentCost = costFunction(particle.position);

      // Update personal best
      if (currentCost < particle.bestCost) {
        particle.bestCost = currentCost;
        particle.bestPosition = [...particle.position];

        // Update global best
        if (currentCost < globalBestCost) {
          globalBestCost = currentCost;
          globalBestPosition = [...particle.position];
        }
      }
      console.log({i, particle})
    }

    // Optional: Logging or stopping criteria based on convergence
    console.log(`Iteration ${iteration + 1}, Global Best Cost: ${globalBestCost}`);
  }

  return { bestPosition: globalBestPosition, bestCost: globalBestCost };
}

// Example cost function: Sphere function (to find the minimum at [0, 0])
function sphereFunction(position) {
  console.log({position})
  return position.reduce((sum, val) => sum + val * val, 0);
}

// Define the search space boundaries [min, max] for each dimension
const bounds = [
  [-5, 5], // Dimension 1
  [-5, 5], // Dimension 2
];

const numParticles = 30;
const maxIterations = 100;

const result = particleSwarmOptimization(
  sphereFunction,
  bounds,
  numParticles,
  maxIterations
);

console.log("Optimization Result:");
console.log("Best Position:", result.bestPosition);
console.log("Best Cost:", result.bestCost);
