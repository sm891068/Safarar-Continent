# Chapter 6: Overall Animations and Transition Effects

## 6.1 Page Loading Sequence
- **Timing**: Start at 0ms, complete at 1000ms.
- **Easing Function**: Ease-in-out.
- **Description**: The page will fade in from 0% to 100% opacity over the loading period, while the content slides up from below.

## 6.2 In-loop Animations
- Define specific animations that will occur continuously while the page is active. 
- **Examples**: 
  - Loading spinners
  - UI notifications
- **Timing**: Varies based on specific element, generally between 300ms and 1000ms.
- **Easing Function**: Linear or cubic-bezier values depending on the desired effect.

## 6.3 Button Selection Transitions
- **Timing**: 150ms on hover, and 300ms on click.
- **Easing Function**: Cubic-bezier(0.25, 0.8, 0.25, 1) for hover; ease-in for click.
- **Description**: Buttons react with a subtle scale and color change upon selection to enhance feedback.
- **Example**:
  - Hover: scale(1.05) and change background color to a lighter shade.
  - Click: scale(0.95) briefly before reverting to normal.