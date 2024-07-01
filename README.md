# BloodBridge

## Live Site
[Visit BloodBridge](https://blood-donation-e615e.web.app)


## Key Features
- **Responsive Design:** Ensures optimal viewing across all devices, including mobile, tablet, and desktop, for a seamless browsing experience.

- **User Roles and Permissions:** The application supports three user roles: Admin, Donor, and Volunteer. Each role has specific permissions and access controls to manage the blood donation process efficiently.

- **Interactive Navigation:** Features an intuitive navbar with active route highlighting, facilitating easy exploration throughout the website.

- **User Registration and Authentication:** Users can register and log in to the platform. New users are assigned the role of Donor by default. The registration process includes input fields for email, name, avatar, blood group, district, upazila, and password.

- **Dashboard for Different Roles:** Each user role has a customized dashboard. Donors can view and manage their donation requests, Volunteers can manage donation requests and content, and Admins have full access to user management, donation requests, and content management.

- **Donation Requests Management:** Donors can create, update, and delete blood donation requests. The system tracks the status of requests (pending, in progress, done, canceled) and allows for easy management through the donor dashboard.

- **Content Management:** Admins and Volunteers can create and manage blog posts. This includes adding, editing, publishing, and deleting blogs. The content management system uses a rich text editor for creating detailed blog posts.

- **JWT Authentication:** The application uses JSON Web Tokens (JWT) for secure user authentication. Tokens are stored in localStorage to protect private routes and API endpoints.

- **Search and Filter Functionality:** Users can search for blood donors based on blood group, district, and upazila. The system provides filtering options for donation requests and user management, improving data accessibility.

- **Environmental Security:** Sensitive information such as Firebase config keys and MongoDB credentials are stored in environment variables to enhance security and protect sensitive data.

- **Profile Management:** Users can view and update their profile information from the dashboard. This includes updating their name, avatar, address, and blood group. Email addresses remain non-editable for security reasons.

- **Pagination and Filtering:** The application includes pagination for user and donation request listings, ensuring efficient data management and faster page loading times. Users can filter donation requests based on their status (pending, in progress, done, canceled) and user accounts based on their status (active, blocked).
