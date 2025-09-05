# Euler's Formula Visualization

This project is an interactive 3D visualization of Euler's formula, one of the most profound and beautiful equations in mathematics. Built with Next.js, React, and Three.js, this application provides an intuitive way to explore the relationship between exponential functions and trigonometry in the complex plane.

![Screenshot of the Euler's Formula Visualization]
<img width="1082" height="646" alt="Screenshot 2025-09-05 095853" src="https://github.com/user-attachments/assets/c921fc26-3f4a-4aa2-a65d-9649e67ea082" />


## The Science Behind the Visualization

At the heart of this project is **Euler's Formula**:

$$ e^{i\theta} = \cos(\theta) + i \sin(\theta) $$

This elegant equation establishes a fundamental link between the exponential function `e^(x)` and the trigonometric functions `cos(θ)` and `sin(θ)` through the use of an imaginary number, `i`.

### Core Concepts Explained:

*   **The Complex Plane**: Unlike a standard number line, the complex plane is a two-dimensional space.
    *   The horizontal axis is the **Real axis (Re)**.
    *   The vertical axis is the **Imaginary axis (Im)**.
    This allows us to plot complex numbers like `a + bi`.

*   **The Unit Circle**: The visualization features a prominent circle with a radius of 1. Any point on this circle can be described by an angle `θ` (theta). The coordinates of that point are `(cos(θ), sin(θ))`.

*   **What the Formula Means**: Euler's formula tells us that the value of `e` raised to an imaginary power `iθ` is a point on the unit circle in the complex plane.
    *   `cos(θ)` is the **real part** (the x-coordinate).
    *   `sin(θ)` is the **imaginary part** (the y-coordinate).

### How the Visualization Represents the Formula:

1.  **The Moving Point**: The primary point that travels around the unit circle represents the term `e^(iθ)`.
2.  **The Vector**: The purple vector from the origin (0,0) to the moving point illustrates the magnitude and direction of `e^(iθ)`. Its length is always 1.
3.  **The Angle `θ`**: As you adjust the `θ` slider, you are changing the angle of the vector relative to the positive Real axis. The animation sweeps `θ` from 0 to 2π radians (a full circle).
4.  **Trigonometric Components**: The dashed lines show how the vector breaks down into its real and imaginary components:
    *   The horizontal line segment represents `cos(θ)`.
    *   The vertical line segment represents `i sin(θ)`.

### Euler's Identity

When you set `θ` to `π` (180°), you arrive at the famous **Euler's Identity**:

$$ e^{i\pi} + 1 = 0 $$

This is often called the most beautiful equation in mathematics because it elegantly connects five fundamental mathematical constants: `0`, `1`, `e`, `i`, and `π`.

## Features

*   **Interactive 3D Scene**: Built with Three.js and React Three Fiber for a smooth, hardware-accelerated experience.
*   **Real-time Controls**: Adjust the angle `θ` and animation speed with sliders.
*   **Dynamic Formula Display**: The mathematical formula updates in real-time to reflect the current value of `θ`.
*   **Key Identity Highlights**: When `θ` approaches key values (0, π/2, π, 3π/2), the corresponding identities are highlighted directly in the visualization.
*   **Adaptive Bloom Effect**: A post-processing bloom effect enhances visual appeal while being intelligently disabled during camera interaction to maintain high performance.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **UI Library**: [React](https://reactjs.org/)
*   **3D Rendering**: [Three.js](https://threejs.org/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
