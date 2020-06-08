# wave-documents-uploader
A Chrome Extension that lets you upload and attach Receipts or Documents to a Transaction
Demo: https://imgur.com/a/9i6Eq2g

# Installation
### PHP Server (to host uploaded files)
- Host PHP code on web server with https (ssl) support.
- Set a custom password in magic.txt file
- On your server, the files will be hosted following this hierarchy: /documents/XXXXXXXXXXX/uploaded_file.jpg (where the X represent the Wave Transaction ID)

### Chrome extension
- Load Unpacked from chrome://extensions
- Right-click on extension's icon to go to the Options page
- Enter Server URL and password, then click Save

# Usage
- Navigate to your Wave Transactions Page
- Click on any transaction
- You should see the Upload link under the "Notes" section of the righ pane (Transaction Details)
- Upload files with the Upload link
- The uploaded files will be listed there too.