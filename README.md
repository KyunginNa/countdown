# Countdown to D-day App

## Overview

This Angular app functions as a countdown timer for events, enabling users to specify the date and
name of the event. It displays the remaining time to the event in the format of Days, Hours(h),
Minutes(m), and Seconds(s). Both the event title and countdown dynamically adjust their display to
fit the width of the screen.

## Features

- **Display Countdown:** The countdown starts from the current time and displays the time remaining
  to the specified end date.
- **Responsive Design:** The app seamlessly adapts to all screen sizes, including both portrait and
  landscape modes, ensuring that the headers always fill the entire width of the screen.
- **Persistent Data Between Page Loads:** The event name and end date specified by the user are
  persisted between page reloads.

## Possible Improvements

- **Improve Initial Render:** The UI may appear jumpy upon initial render due to font size
  adjustments for the title and countdown after the elements are rendered. Consider adding a loading
  state or animation to gracefully resolve this issue.
- **Restrict Countdown for Future Dates:** Currently, the countdown displays "-" if users choose the
  past dates. Implement restrictions on the UI so that users can only select future dates, enhancing
  the user experience and accuracy of the countdown.
- **Custom Date Picker UI:** Add a custom date picker UI to hide the calendar icon.

## Installation

To run the app locally, follow these steps:

1. Fork and clone the repository to your local machine:

```
git clone git@github.com:KyunginNa/countdown.git
```

2. Navigate to the project directory:

```
cd countdown
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
ng serve
```

5. Open your browser and navigate to `http://localhost:4200/`.

## Usage

1. Specify the end date of the event and the event name in the designated input fields.
2. The countdown will start automatically from the current time.
3. The countdown format will be displayed as Days, Hours(h), Minutes(m), and Seconds(s).
4. Ensure that the text always covers the entire screen width, resizing as necessary.

## Deployment

The app is deployed and accessible at [nc-countdown.netlify.app](https://nc-countdown.netlify.app).

## Technologies Used

- Angular

## Author

- [Kyungin Na](https://github.com/KyunginNa)

## License

This project is licensed under the [MIT License](LICENSE).
