# **App Name**: EulerVis

## Core Features:

- 3D Complex Plane Visualization: Dynamically render a 3D complex plane with labeled real and imaginary axes to show Euler's formula.
- Unit Circle with Rotating Vector: Animate a unit circle with a vector rotating around it, visualizing the phasor. The rotation speed and direction of the vector should be controllable by the user via a speed control, which influences the time derivative of the parameter theta. Provide a pause button as well. Vector/phasor angles should be constrained to be multiples of pi/12 radians to start, with the user being able to select arbitrary floating-point values.
- Coordinate Mapping: Map the vector's tip to the cosine (real) and sine (imaginary) components, displaying them visually with glowing lines that also act as hints.
- Key Identity Highlighting: Highlight key identities (e.g., Euler's Identity, 𝑒^{iπ} = -1) as the vector passes those points using popup labels.  A reasoning tool decides which values should be marked clearly based on significance.
- Formula Display: Show the complete Euler's formula 𝑒^{iθ} = cos(θ) + i*sin(θ), updated live, reflecting changes in the visualization.
- User Controls: Provide controls to adjust θ (interactively rotating the visualization) and view the real and imaginary components independently, as well as the visualization's overall rotation and zoom.

## Style Guidelines:

- Primary color: Electric Indigo (#6F00FF) for the rotating vector, suggesting the mathematical transformation.
- Background color: Dark gray (#222222) to provide contrast and make the glowing elements stand out.
- Accent color: Cyan (#00FFFF) for highlighting key identities and the unit circle, giving a sharp and clear indication.
- Body and headline font: 'Inter', a sans-serif font for a clean, modern look; use 'Space Grotesk' for any short titles or labels requiring emphasis. Pair 'Space Grotesk' with 'Inter' for headlines.
- Use minimalist icons for interactive elements like play/pause, rotation, and zoom controls. These icons should glow subtly when interacted with.
- Center the 3D visualization on the screen, with controls arranged intuitively around it. Keep the layout clean and free of clutter.
- Employ smooth, continuous animations for vector rotation and formula updates to illustrate the mathematical relationships fluidly.