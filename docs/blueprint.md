# **App Name**: StitchFlow

## Core Features:

- User Role Management: Admin panel to create and manage user accounts with role-based permissions (Admin, Supervisor, Staff).
- Order Tracking: Real-time tracking of each order through its stages (cutting, stitching, ready for packing, packed, ready to deliver).
- Status Updates: Easy-to-use interface for staff to update the status of orders in their assigned stage, automatically moving the order to the next stage upon completion.
- Reporting and Analytics: Generation of daily, weekly, and monthly production reports, along with staff performance tracking and bottleneck analysis. Admin can export reports to Excel.
- Notifications: Automated notifications to admin and supervisors for order stage completion, delays, or inactivity.
- Secure Authentication: Secure email/password login system managed by Firebase Authentication, with admin-only user creation and management.
- Summary Suggestions: Provide intelligent summaries of reports for supervisors using AI. LLM will use the role as a tool when deciding if certain sensitive info should be added.

## Style Guidelines:

- Primary color: Deep navy blue (#1A237E) to convey professionalism and reliability.
- Background color: Light blue-gray (#E8EAF6), subtly desaturated from the primary, to provide a clean backdrop.
- Accent color: Muted lavender (#9FA8DA), a lighter analogous hue, for interactive elements and highlights.
- Body and headline font: 'Inter', a sans-serif font with a modern and neutral feel.
- Use clear, minimalist icons to represent order stages and actions.
- Dashboard layout optimized for mobile, featuring clear progress indicators and easy-to-access status update options.
- Subtle transitions and animations to indicate status updates and navigation changes.