# AnyDebate AI - Manual Testing Guide

## Overview
This document provides a comprehensive manual testing checklist for AnyDebate AI. Test all features on both **Desktop** and **Mobile** devices to ensure perfect UI/UX functionality.

---

## Testing Environment Setup

### Desktop Testing
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Screen Sizes**: 1920x1080, 1366x768, 1280x720

### Mobile Testing
- **Devices**: iPhone (iOS Safari), Android (Chrome)
- **Screen Sizes**: 375x667 (iPhone SE), 390x844 (iPhone 12/13), 414x896 (iPhone 11 Pro Max)
- **Orientations**: Portrait and Landscape

---

## 1. Landing Page

### Desktop Tests
- [ ] **Task 1.1**: Verify hero section displays correctly with title, subtitle, and CTA button
- [ ] **Task 1.2**: Click "Start Your First Debate Now" button → should redirect to `/dashboard`
- [ ] **Task 1.3**: Verify all sections load (Features, How It Works, Use Cases, etc.)
- [ ] **Task 1.4**: Check that all images/icons render properly
- [ ] **Task 1.5**: Verify smooth scrolling between sections
- [ ] **Task 1.6**: Test all navigation links in header (if any)
- [ ] **Task 1.7**: Verify footer displays correctly with all links

### Mobile Tests
- [ ] **Task 1.8**: Verify hero section is readable and CTA button is easily tappable
- [ ] **Task 1.9**: Check that content stacks vertically without horizontal scroll
- [ ] **Task 1.10**: Verify touch interactions work smoothly
- [ ] **Task 1.11**: Test CTA button redirects to `/dashboard` on mobile
- [ ] **Task 1.12**: Verify all sections are readable without zooming

---

## 2. Navigation & Routing

### Desktop Tests
- [ ] **Task 2.1**: Verify sidebar is visible on all pages (`/dashboard`, `/debates`, `/agents`, `/analytics`)
- [ ] **Task 2.2**: Click "Home" in sidebar → should navigate to `/dashboard`
- [ ] **Task 2.3**: Click "Debates" in sidebar → should navigate to `/debates` and show count badge
- [ ] **Task 2.4**: Click "Agents" in sidebar → should navigate to `/agents`
- [ ] **Task 2.5**: Click "Analytics" in sidebar → should navigate to `/analytics`
- [ ] **Task 2.6**: Click "Settings" in sidebar → verify it opens settings (or shows coming soon)
- [ ] **Task 2.7**: Verify active page is highlighted in sidebar
- [ ] **Task 2.8**: Test sidebar collapse/expand functionality (if implemented)
- [ ] **Task 2.9**: Verify no broken links or 404 errors (especially `/overview` should not exist)
- [ ] **Task 2.10**: Test browser back/forward buttons work correctly

### Mobile Tests
- [ ] **Task 2.11**: Verify sidebar is accessible via hamburger menu or swipe gesture
- [ ] **Task 2.12**: Test opening and closing sidebar on mobile
- [ ] **Task 2.13**: Verify sidebar overlays content (doesn't push it)
- [ ] **Task 2.14**: Test all navigation links work on mobile
- [ ] **Task 2.15**: Verify active page is highlighted in mobile sidebar
- [ ] **Task 2.16**: Test that sidebar closes after selecting a page

---

## 3. Dashboard/Home Page

### Desktop Tests
- [ ] **Task 3.1**: Verify page title shows "Home" (not "Dashboard")
- [ ] **Task 3.2**: Verify welcome message displays correctly
- [ ] **Task 3.3**: Check "Quick Actions" section displays 3 cards: Quick Start, New Debate, Create Agent
- [ ] **Task 3.4**: Click "Quick Start" → should navigate to `/quick-start` or open template modal
- [ ] **Task 3.5**: Click "New Debate" → should navigate to `/debates` with new session
- [ ] **Task 3.6**: Click "Create Agent" → should navigate to `/agents` or open agent builder
- [ ] **Task 3.7**: Verify "Recent Activity" section displays recent sessions (or empty state)
- [ ] **Task 3.8**: Verify "Active Sessions" counter shows correct count
- [ ] **Task 3.9**: Test clicking on a recent session → should navigate to that debate
- [ ] **Task 3.10**: Verify no analytics stats are shown on this page (moved to Analytics)

### Mobile Tests
- [ ] **Task 3.11**: Verify Quick Actions cards stack vertically and are easily tappable
- [ ] **Task 3.12**: Check that all content is readable without horizontal scroll
- [ ] **Task 3.13**: Test all quick action buttons work on mobile
- [ ] **Task 3.14**: Verify Recent Activity list is scrollable on mobile
- [ ] **Task 3.15**: Test touch interactions for session cards

---

## 4. Analytics Dashboard

### Desktop Tests
- [ ] **Task 4.1**: Verify page title shows "Analytics Dashboard"
- [ ] **Task 4.2**: Check that 4 metric cards display: Total Debates, Active Agents, Avg. Session Time, Engagement Rate
- [ ] **Task 4.3**: Verify each metric shows a value (0 if no data) and trend indicator
- [ ] **Task 4.4**: Check trend colors: green for positive, red for negative
- [ ] **Task 4.5**: Verify "Coming Soon" section displays below metrics
- [ ] **Task 4.6**: Check that "Coming Soon" message explains future analytics features
- [ ] **Task 4.7**: Verify metrics grid is responsive (2x2 on desktop)

### Mobile Tests
- [ ] **Task 4.8**: Verify metrics stack vertically (1 column) on mobile
- [ ] **Task 4.9**: Check that all metric cards are readable and properly sized
- [ ] **Task 4.10**: Verify "Coming Soon" section is visible and readable on mobile
- [ ] **Task 4.11**: Test scrolling through all metrics on mobile

---

## 5. Debates Page & Chat Interface

### Desktop Tests
- [ ] **Task 5.1**: Verify page shows "My Debates" title with session count
- [ ] **Task 5.2**: Check filter tabs: All, Active, Completed
- [ ] **Task 5.3**: Test filtering sessions by status
- [ ] **Task 5.4**: Verify search bar filters sessions by title/topic
- [ ] **Task 5.5**: Click "New Debate" button → should create new session
- [ ] **Task 5.6**: Verify session list displays with titles, timestamps, and agent count
- [ ] **Task 5.7**: Click on a session → should open chat interface
- [ ] **Task 5.8**: Test chat input field accepts text
- [ ] **Task 5.9**: Send a message → verify it appears in chat with user avatar
- [ ] **Task 5.10**: Verify AI agents respond with streaming text
- [ ] **Task 5.11**: Check that agent avatars and names display correctly
- [ ] **Task 5.12**: Test message timestamps display correctly
- [ ] **Task 5.13**: Verify chat scrolls to bottom on new messages
- [ ] **Task 5.14**: Test "Stop Generation" button appears during AI response
- [ ] **Task 5.15**: Click "Stop Generation" → should halt AI response
- [ ] **Task 5.16**: Verify chat history persists when navigating away and back
- [ ] **Task 5.17**: Test delete session button → should remove session from list
- [ ] **Task 5.18**: Verify empty state shows when no sessions exist

### Mobile Tests
- [ ] **Task 5.19**: Verify session list is scrollable on mobile
- [ ] **Task 5.20**: Check that session cards are easily tappable
- [ ] **Task 5.21**: Test chat interface on mobile (input at bottom, messages scroll)
- [ ] **Task 5.22**: Verify keyboard doesn't cover input field on mobile
- [ ] **Task 5.23**: Test sending messages on mobile
- [ ] **Task 5.24**: Verify AI responses stream correctly on mobile
- [ ] **Task 5.25**: Check that agent avatars are visible but not too large on mobile
- [ ] **Task 5.26**: Test "Stop Generation" button is accessible on mobile
- [ ] **Task 5.27**: Verify chat scrolling works smoothly on mobile
- [ ] **Task 5.28**: Test swipe gestures (if implemented) for navigation

---

## 6. Agent Management

### Desktop Tests
- [ ] **Task 6.1**: Verify page shows "Agent Management" title with agent count
- [ ] **Task 6.2**: Check filter tabs: All, Active, Custom
- [ ] **Task 6.3**: Test filtering agents by status
- [ ] **Task 6.4**: Verify search bar filters agents by name/role
- [ ] **Task 6.5**: Click "Create Agent" button → should open agent builder
- [ ] **Task 6.6**: Verify agent list displays with names, roles, and avatars
- [ ] **Task 6.7**: Click "Load Team" button → should open team presets modal
- [ ] **Task 6.8**: Test selecting a team preset → should load multiple agents
- [ ] **Task 6.9**: Verify agent cards show edit and delete buttons on hover
- [ ] **Task 6.10**: Click edit on an agent → should open agent builder with data
- [ ] **Task 6.11**: Click delete on an agent → should show confirmation and remove agent
- [ ] **Task 6.12**: Verify empty state shows when no agents exist
- [ ] **Task 6.13**: Test "Create New Agent" card is always visible

### Mobile Tests
- [ ] **Task 6.14**: Verify agent cards stack vertically on mobile
- [ ] **Task 6.15**: Check that all buttons are easily tappable
- [ ] **Task 6.16**: Test opening agent builder on mobile
- [ ] **Task 6.17**: Verify "Load Team" button works on mobile
- [ ] **Task 6.18**: Test edit/delete actions on mobile (may use swipe or long-press)
- [ ] **Task 6.19**: Verify agent list is scrollable on mobile

---

## 7. Agent Builder & Configuration

### Desktop Tests
- [ ] **Task 7.1**: Verify agent builder modal/page opens correctly
- [ ] **Task 7.2**: Check all form fields: Name, Role, Persona, Framework, Custom Instructions
- [ ] **Task 7.3**: Test "Role" dropdown shows 50+ options
- [ ] **Task 7.4**: Test "Persona" dropdown shows 8 options
- [ ] **Task 7.5**: Test "Framework" dropdown shows 16+ options
- [ ] **Task 7.6**: Verify role descriptions update when selecting different roles
- [ ] **Task 7.7**: Test custom instructions textarea accepts text
- [ ] **Task 7.8**: Verify character count for custom instructions (if implemented)
- [ ] **Task 7.9**: Click "Save Agent" → should create/update agent and close builder
- [ ] **Task 7.10**: Click "Cancel" → should close builder without saving
- [ ] **Task 7.11**: Test form validation (required fields)
- [ ] **Task 7.12**: Verify agent preview updates as you configure
- [ ] **Task 7.13**: Test "Reset to Default" button (if implemented)

### Mobile Tests
- [ ] **Task 7.14**: Verify agent builder is usable on mobile (full screen or modal)
- [ ] **Task 7.15**: Check that all dropdowns work on mobile
- [ ] **Task 7.16**: Test scrolling through long dropdown lists on mobile
- [ ] **Task 7.17**: Verify textarea is easily editable on mobile
- [ ] **Task 7.18**: Test save/cancel buttons are accessible on mobile
- [ ] **Task 7.19**: Verify keyboard doesn't cover form fields on mobile

---

## 8. Templates & Quick Start

### Desktop Tests
- [ ] **Task 8.1**: Navigate to `/quick-start` → verify page loads
- [ ] **Task 8.2**: Check that template selector modal opens (if triggered from dashboard)
- [ ] **Task 8.3**: Verify tabs: "Quick Start" and "Templates"
- [ ] **Task 8.4**: Click "Quick Start" tab → should show 9 scenario cards
- [ ] **Task 8.5**: Verify each scenario shows title, description, and agent count
- [ ] **Task 8.6**: Click on a scenario → should load agents and navigate to debates
- [ ] **Task 8.7**: Click "Templates" tab → should show template library
- [ ] **Task 8.8**: Verify template categories: Business, Education, Creative, etc.
- [ ] **Task 8.9**: Test category filter chips
- [ ] **Task 8.10**: Test search bar filters templates
- [ ] **Task 8.11**: Click on a template → should show template details
- [ ] **Task 8.12**: Click "Use Template" → should load template and start debate
- [ ] **Task 8.13**: Verify template preview shows agent configurations
- [ ] **Task 8.14**: Test "Load Team" presets (8 team configurations)

### Mobile Tests
- [ ] **Task 8.15**: Verify template selector is usable on mobile
- [ ] **Task 8.16**: Check that scenario cards are easily tappable
- [ ] **Task 8.17**: Test swiping between tabs on mobile
- [ ] **Task 8.18**: Verify template cards stack vertically on mobile
- [ ] **Task 8.19**: Test category chips are scrollable horizontally on mobile
- [ ] **Task 8.20**: Verify template details are readable on mobile

---

## 9. Artifacts System

### Desktop Tests
- [ ] **Task 9.1**: Start a debate and trigger artifact creation (ask AI to create a document/table/checklist/chart)
- [ ] **Task 9.2**: Verify artifact appears in sidebar or dedicated panel
- [ ] **Task 9.3**: Check artifact types: Document, Table, Checklist, Chart
- [ ] **Task 9.4**: Test document artifact displays rich text correctly
- [ ] **Task 9.5**: Test table artifact displays rows/columns correctly
- [ ] **Task 9.6**: Test checklist artifact shows checkboxes and items
- [ ] **Task 9.7**: Test chart artifact renders visualization correctly
- [ ] **Task 9.8**: Click on an artifact → should open in full view
- [ ] **Task 9.9**: Test artifact toolbar buttons: Edit, Export, Version History, Delete
- [ ] **Task 9.10**: Click "Edit" → should enable editing mode
- [ ] **Task 9.11**: Make changes to artifact → verify changes save
- [ ] **Task 9.12**: Click "Export" → should show export options (PDF, PNG, CSV, JSON, Markdown)
- [ ] **Task 9.13**: Test exporting artifact as PDF → should download file
- [ ] **Task 9.14**: Test exporting artifact as Markdown → should download file
- [ ] **Task 9.15**: Click "Version History" → should show previous versions
- [ ] **Task 9.16**: Test restoring a previous version
- [ ] **Task 9.17**: Click "Delete" → should show confirmation and remove artifact
- [ ] **Task 9.18**: Verify artifact search functionality
- [ ] **Task 9.19**: Test artifact templates (30+ pre-built templates)
- [ ] **Task 9.20**: Verify artifact count displays correctly

### Mobile Tests
- [ ] **Task 9.21**: Verify artifacts are accessible on mobile
- [ ] **Task 9.22**: Check that artifact list is scrollable on mobile
- [ ] **Task 9.23**: Test opening artifact in full view on mobile
- [ ] **Task 9.24**: Verify artifact toolbar is accessible on mobile (may be in overflow menu)
- [ ] **Task 9.25**: Test editing artifacts on mobile
- [ ] **Task 9.26**: Test exporting artifacts on mobile
- [ ] **Task 9.27**: Verify version history is usable on mobile

---

## 10. Export Features

### Desktop Tests
- [ ] **Task 10.1**: Open a debate session with messages
- [ ] **Task 10.2**: Click "Export" button in chat interface
- [ ] **Task 10.3**: Verify export modal shows options: PDF, Markdown, JSON
- [ ] **Task 10.4**: Select "Export as PDF" → should download PDF with chat history
- [ ] **Task 10.5**: Open PDF → verify formatting, agent names, timestamps are correct
- [ ] **Task 10.6**: Select "Export as Markdown" → should download .md file
- [ ] **Task 10.7**: Open Markdown file → verify content is properly formatted
- [ ] **Task 10.8**: Select "Export as JSON" → should download .json file
- [ ] **Task 10.9**: Open JSON file → verify data structure is correct
- [ ] **Task 10.10**: Test exporting session with artifacts → verify artifacts are included
- [ ] **Task 10.11**: Test exporting empty session → should show appropriate message
- [ ] **Task 10.12**: Verify export includes metadata (date, topic, agent count)

### Mobile Tests
- [ ] **Task 10.13**: Test export button is accessible on mobile
- [ ] **Task 10.14**: Verify export modal is usable on mobile
- [ ] **Task 10.15**: Test downloading files on mobile (may open in new tab)
- [ ] **Task 10.16**: Verify exported files are readable on mobile devices

---

## 11. Advanced Chat Features

### Desktop Tests
- [ ] **Task 11.1**: Test message search within a session
- [ ] **Task 11.2**: Enter search query → verify matching messages are highlighted
- [ ] **Task 11.3**: Test search navigation (next/previous match)
- [ ] **Task 11.4**: Test message threading (if implemented) → reply to a specific message
- [ ] **Task 11.5**: Verify threaded replies are indented or visually connected
- [ ] **Task 11.6**: Test message reactions → click reaction button on a message
- [ ] **Task 11.7**: Verify reaction picker shows emoji options
- [ ] **Task 11.8**: Add reaction → verify it appears on message with count
- [ ] **Task 11.9**: Test bookmarking messages → click bookmark icon
- [ ] **Task 11.10**: Verify bookmarked messages are saved and accessible
- [ ] **Task 11.11**: Navigate to bookmarks view → verify all bookmarked messages display
- [ ] **Task 11.12**: Test removing bookmark from a message
- [ ] **Task 11.13**: Test session comparison feature (if implemented)
- [ ] **Task 11.14**: Select multiple sessions → click "Compare"
- [ ] **Task 11.15**: Verify comparison view shows sessions side-by-side

### Mobile Tests
- [ ] **Task 11.16**: Test message search on mobile
- [ ] **Task 11.17**: Verify search results are readable on mobile
- [ ] **Task 11.18**: Test message reactions on mobile (tap to open picker)
- [ ] **Task 11.19**: Verify reaction picker is usable on mobile
- [ ] **Task 11.20**: Test bookmarking messages on mobile
- [ ] **Task 11.21**: Verify bookmarks view is accessible on mobile

---

## 12. Theme & Dark Mode

### Desktop Tests
- [ ] **Task 12.1**: Locate theme toggle button (usually in header or settings)
- [ ] **Task 12.2**: Click theme toggle → should switch between light and dark mode
- [ ] **Task 12.3**: Verify all pages respect theme setting
- [ ] **Task 12.4**: Check text contrast in dark mode (should be readable)
- [ ] **Task 12.5**: Verify all components (buttons, cards, modals) have proper dark mode styles
- [ ] **Task 12.6**: Test that theme preference persists after page reload
- [ ] **Task 12.7**: Verify images/icons are visible in both themes
- [ ] **Task 12.8**: Check that syntax highlighting (if any) works in dark mode

### Mobile Tests
- [ ] **Task 12.9**: Test theme toggle on mobile
- [ ] **Task 12.10**: Verify dark mode is readable on mobile screens
- [ ] **Task 12.11**: Check that all touch targets are visible in both themes

---

## 13. Settings (If Implemented)

### Desktop Tests
- [ ] **Task 13.1**: Navigate to Settings page
- [ ] **Task 13.2**: Verify settings categories display (if any)
- [ ] **Task 13.3**: Test changing user preferences (if implemented)
- [ ] **Task 13.4**: Verify settings save correctly
- [ ] **Task 13.5**: Test "Reset to Default" button (if implemented)

### Mobile Tests
- [ ] **Task 13.6**: Verify settings page is usable on mobile
- [ ] **Task 13.7**: Test all settings controls work on mobile

---

## 14. Mobile Responsiveness (General)

### Mobile Tests
- [ ] **Task 14.1**: Test all pages in portrait orientation
- [ ] **Task 14.2**: Test all pages in landscape orientation
- [ ] **Task 14.3**: Verify no horizontal scrolling on any page
- [ ] **Task 14.4**: Check that all text is readable without zooming
- [ ] **Task 14.5**: Verify all buttons/links have adequate touch targets (min 44x44px)
- [ ] **Task 14.6**: Test that modals/dialogs fit within viewport on mobile
- [ ] **Task 14.7**: Verify forms are usable on mobile (inputs not covered by keyboard)
- [ ] **Task 14.8**: Test that dropdowns/selects work correctly on mobile
- [ ] **Task 14.9**: Verify loading states are visible on mobile
- [ ] **Task 14.10**: Test that error messages are readable on mobile

---

## 15. Performance & Loading States

### Desktop Tests
- [ ] **Task 15.1**: Verify loading spinners appear during AI responses
- [ ] **Task 15.2**: Check that page transitions are smooth
- [ ] **Task 15.3**: Test that large sessions load without freezing
- [ ] **Task 15.4**: Verify images load progressively (if applicable)
- [ ] **Task 15.5**: Test that app remains responsive during heavy operations

### Mobile Tests
- [ ] **Task 15.6**: Verify loading states are visible on mobile
- [ ] **Task 15.7**: Test app performance on slower mobile devices
- [ ] **Task 15.8**: Check that animations are smooth on mobile

---

## 16. Error Handling & Edge Cases

### Desktop Tests
- [ ] **Task 16.1**: Test with no internet connection → verify error messages
- [ ] **Task 16.2**: Test with slow internet → verify loading states
- [ ] **Task 16.3**: Try to create agent with empty name → verify validation error
- [ ] **Task 16.4**: Try to send empty message → verify it's prevented
- [ ] **Task 16.5**: Test deleting last session → verify empty state appears
- [ ] **Task 16.6**: Test with very long message → verify it displays correctly
- [ ] **Task 16.7**: Test with special characters in input → verify they're handled
- [ ] **Task 16.8**: Test browser back button during various operations
- [ ] **Task 16.9**: Test refreshing page during AI response → verify state recovery
- [ ] **Task 16.10**: Test localStorage limits (if storing large amounts of data)

### Mobile Tests
- [ ] **Task 16.11**: Test all error scenarios on mobile
- [ ] **Task 16.12**: Verify error messages are readable on mobile
- [ ] **Task 16.13**: Test app behavior when switching between apps on mobile

---

## 17. Accessibility (A11y)

### Desktop Tests
- [ ] **Task 17.1**: Test keyboard navigation (Tab, Enter, Escape)
- [ ] **Task 17.2**: Verify all interactive elements are keyboard accessible
- [ ] **Task 17.3**: Test screen reader compatibility (if possible)
- [ ] **Task 17.4**: Verify focus indicators are visible
- [ ] **Task 17.5**: Check that color is not the only means of conveying information
- [ ] **Task 17.6**: Verify alt text for images
- [ ] **Task 17.7**: Test with browser zoom (150%, 200%)

### Mobile Tests
- [ ] **Task 17.8**: Test with mobile screen reader (VoiceOver on iOS, TalkBack on Android)
- [ ] **Task 17.9**: Verify touch targets are large enough
- [ ] **Task 17.10**: Test with mobile accessibility features enabled

---

## 18. Data Persistence (LocalStorage)

### Desktop Tests
- [ ] **Task 18.1**: Create a session → refresh page → verify session persists
- [ ] **Task 18.2**: Create an agent → refresh page → verify agent persists
- [ ] **Task 18.3**: Bookmark a message → refresh page → verify bookmark persists
- [ ] **Task 18.4**: Change theme → refresh page → verify theme persists
- [ ] **Task 18.5**: Test clearing browser data → verify app handles gracefully
- [ ] **Task 18.6**: Test with localStorage disabled → verify app shows appropriate message

### Mobile Tests
- [ ] **Task 18.7**: Test data persistence on mobile browsers
- [ ] **Task 18.8**: Test app behavior after closing and reopening browser on mobile

---

## 19. Cross-Browser Compatibility

### Desktop Tests
- [ ] **Task 19.1**: Test all features in Chrome
- [ ] **Task 19.2**: Test all features in Firefox
- [ ] **Task 19.3**: Test all features in Safari
- [ ] **Task 19.4**: Test all features in Edge
- [ ] **Task 19.5**: Verify consistent styling across browsers
- [ ] **Task 19.6**: Check for browser-specific bugs

### Mobile Tests
- [ ] **Task 19.7**: Test on iOS Safari
- [ ] **Task 19.8**: Test on Android Chrome
- [ ] **Task 19.9**: Test on other mobile browsers (if applicable)

---

## 20. Final Checks

### Desktop Tests
- [ ] **Task 20.1**: Complete a full user journey: Landing → Dashboard → Create Agents → Start Debate → Export
- [ ] **Task 20.2**: Verify no console errors in browser DevTools
- [ ] **Task 20.3**: Check for any broken images or missing assets
- [ ] **Task 20.4**: Verify all links work correctly
- [ ] **Task 20.5**: Test with different screen resolutions
- [ ] **Task 20.6**: Verify app works in incognito/private mode

### Mobile Tests
- [ ] **Task 20.7**: Complete a full user journey on mobile
- [ ] **Task 20.8**: Verify no console errors on mobile
- [ ] **Task 20.9**: Test with different mobile devices
- [ ] **Task 20.10**: Verify app works in mobile private browsing mode

---

## Testing Notes

### How to Report Issues
When you find a bug or issue, document:
1. **Feature/Page**: Where the issue occurred
2. **Device/Browser**: Desktop (Chrome) or Mobile (iPhone Safari)
3. **Steps to Reproduce**: Exact steps to trigger the issue
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happened
6. **Screenshots**: If applicable

### Priority Levels
- **P0 (Critical)**: App crashes, data loss, broken core features
- **P1 (High)**: Major features not working, poor UX
- **P2 (Medium)**: Minor bugs, cosmetic issues
- **P3 (Low)**: Nice-to-have improvements

---

## Summary

This testing guide covers **300+ test cases** across **20 feature categories**. Complete all tests to ensure AnyDebate AI is production-ready before implementing Phase 4 (Database & Persistence Layer).

**Estimated Testing Time**: 8-12 hours for comprehensive testing on both desktop and mobile.

---

**Last Updated**: Current as of Phase 3 completion (100% pre-database features)
