---
title: "Accounting"
---

# Tax & Compliance
FlowFuse partners with external specialists to ensure global and domestic tax compliance.

| Category        | Responsibility / Provider                                          |   Frequency |
| ----------------| -------------------------------------------------------------------| -----------------------------|
| Payroll Tax     | Managed via Deel                                    | Per pay cycle
| Income Tax      | Tax Consultants (filing in all states with physical presence/nexus)| Annual / Quarterly
| Tax R&D Credit  | Tax Consultants (specialized study and filing)                     | Annual
| USA Sales Tax   | TBC                                                                | Monthly/Quarterly
| UK Sales Tax    | Calculated and filled by third party (#monthly-uk-vat-filing-sop-taxually-submission)                                 | Quarterly

To find out the names of the providers, please visit our [vendor sheet](https://docs.google.com/spreadsheets/d/1ro77wy0cRK6gpzVv_iq4vpdmbdMq61X5-tTwI_F3hXM/edit?gid=0#gid=0). 

## Handling Payroll Tax Notices

Whenever we receive mail regarding Payroll Taxes, it must be submitted immediately to Deel for review and resolution. Do not email these documents to our Customer Success Manager (CSM); instead, upload them directly through the Deel platform using the automated system.

### How to Submit a Tax Notice in Deel
1. Locate the Notice: Access the document in our email. Download it as a high-quality PDF or image.
2. Navigate in Deel: Log into the Deel platform and go to the Payroll section.
3. Open Tax Documents: Select the Tax Documents tab, then click on the Tax Notices tab.
4. Upload: Click Add notice.
5. Review: Deel's platform will automatically scan the document and extract the key details (no manual data entry required). Verify that the pulled information looks correct.
6. Submit: Click Submit.
7. Tip for Image Quality: If you are uploading a photo instead of a digital PDF scan, ensure the image is perfectly clear and legible. High-quality uploads allow Deel's system to read the text accurately, which significantly speeds up the review process.

#### Track the Status
Once submitted, the notice status will update to Received.
* Expert Review: The notice goes directly to Deel's tax specialists, who will handle the resolution and provide guidance or next steps.
* CSM Updates: Our Deel CSM will keep us informed of any critical updates.
* Central Tracking: You can track the real-time status of the notice and any actions directly within the Deel dashboard—no need to dig through email threads.

## Bad Debt Process

An invoice should only be written off as bad debt if the client has already received and used FlowFuse products. Do not mark the invoice as paid or void it, as this would distort revenue numbers.
> ⚠️ Only write off as bad debt if the client has received and actively used the product. When in doubt, consult with the Finance team before proceeding.

### Steps

1. **In HubSpot**, navigate to the client's account and locate the specific invoice. On the invoice, click the three-dot menu and select **"Create credit memo"**. When creating the credit memo, set the reason to "Other" and manually enter "bad debt" in the description field. This ensures the credit memo is tied directly to the original invoice on the client's record.
2. **Email Zeni Accounting Team** at team@zeni.ai with the invoice number to notify them that the invoice is being written off as bad debt. You can also flag it in Slack as an additional notice, but the main notice should go out via email. 
4. **In QBO**, the Zeni accounting team will verify that the credit memo has been applied to the invoice — either automatically through the HubSpot sync or manually if it did not sync correctly.

## Monthly UK VAT Filing SOP: Taxually Submission

### Phase 1: Set Up This Month's Workbook

1. **Duplicate last month's file** in [this Drive folder](https://drive.google.com/drive/folders/1oZmVkpkv7E2uawCjhzqIoWaaNoi3_M3W). Move the copy into a new folder named for the current month, and rename the file Taxually Monthly Data - [Month] 2026.
2. **Export Stripe invoices**: open the [Stripe invoices tab](https://dashboard.stripe.com/acct_1KJbS4J6VWAujNoL/invoices), set a *wide* date range (e.g. for April, use late March through early May) so you don't cut off invoices paid near a month boundary. Select **All Columns**, export in **UTC**.
3. **Import the export** into the new workbook you created in step 1 as a new sheet. Rename that sheet to the month (e.g. April 2026).
4. **Extend the helper columns**: scroll to the last used column, add 5 new columns. Go to last month's sheet, copy the 5 header names (highlighted green) from row 1, and paste into row 1 at the same position in this month's sheet. Copy the formulas from row 2 of those same 5 columns in last month's sheet, paste into row 2 here, then drag down to fill every row.

   - These 5 columns compute the GBP conversion and the VAT-inclusive Net/VAT split for each transaction. If you ever need to rebuild them from scratch, the formulas are:

     - **GBP Converted Sales** (Gross in GBP): `=IF(AY2="GB",ROUND(XLOOKUP(INT(P2),'GBP exchange rate'!D:D,'GBP exchange rate'!E:E,0,1)*AG2,2),0)`
     - **GBP Calc Tax** (VAT in GBP, backed out, not added on top): `=ROUND(IF(AND(AY2="GB",AM2=""),BA2-BA2/1.2,0),2)`
     - **GBP Net Sales**: `=BA2-BB2`
     - **USD Net (VAT back-out)**: `=IF(AND(AY2="GB",AM2=""),ROUND(AG2/1.2,2),AG2)`
     - **USD VAT (back-out)**: `=ROUND(AG2-BD2,2)`
   - *(Column letters: AY, AM, AG, P, assume Stripe's standard export order. Confirm they still point at Customer Address Country, Customer Tax ID, Amount Paid, and Paid At (UTC) before dragging down.)*
5. **Sanity-check the totals** look reasonable before moving on (roughly in line with prior months, no wildly implausible numbers).

### Phase 2: Clean the Raw Export

On the new monthly stripe exported sheet that is now renamed after the month of data you are analyzing,

- Step 1: Filter the "Customer Address Country" and choose only "GB" **+** "Paid At" column for any date that falls outside this month (this is why the export window was wider than the month itself). Delete those rows from the workbook
- Step 2: Remove the filter from the "Paid At" column and select all the remaining items.
- Step 2: Filter "Amount Paid" column for the 0 values and delete those rows
- Any sale to an **internal/test customer** (checked manually, no fixed rule currently, so this needs a human eye each month).
- Extra check: Review the sheet for any void, draft, or uncollectible (no payment was ever collected, which means no VAT liability, nothing to report) and delete those rows as well.

Once you've completed your check, what's left is this month's final UK sales dataset. (Basically anything under the column Customer Address Country = GB)

### Phase 3: Cross-Check Against HubSpot

Separately, check HubSpot for any deals closed-won that month with a UK-based account, as a cross-check against the Stripe list.

Review this [report](https://app-eu1.hubspot.com/reports-list/26586079/369512537/?search=closed%20won&sortOrder=ascending&sortBy=LAST_VIEWED_AT) and edit the dates on the report to see it for the month you're doing the analysis for.

Also worth a quick address/postcode glance rather than trusting the Country/Region field alone — we've caught multiple accounts (Cargill, Moderna, Nintendo, a Maastricht university) with a Country field that doesn't match their actual address.

### Phase 4: Populate "Your data"

In the "Your data" sheet, clear existing contents in columns **C–F** and **J** (keep A, B, G, H, I, K as pre-filled template defaults). Once the data is removed, fill it in with the following sources:

| **Column** | **Source** | **Notes** |
|:-:|:-:|:-:|
| **D** – VAT number | Paste from **Customer Tax ID from the stripe monthly data export sheet** | Check every pasted value. If the "GB" prefix is missing (a recurring Excel-formatting glitch, especially with Pool Sentry), add it back manually. |
| **E** – Transaction date | Paste from **Paid At from the stripe monthly data export sheet** | Format as DD-MM-YYYY (select column → Format → Number → Custom date and time). |
| **F** – Invoice number | Paste from **Number from the stripe monthly data export sheet** | |
| **J** – Gross amount | Paste from **Amount Paid from the stripe monthly data export sheet** | |

**Columns L (VAT Rate), M (Net amount), N (VAT amount)** should already have formulas that autofill down — but for reference, the logic is:

- **L2**: `=IF(D2="",0.2,0)`
- **M2**: `=IF(D2="",ROUND(J2/1.2,2),J2)`
- **N2**: `=J2-M2`

In words: if there's a VAT number in column D, it's a B2B reverse-charge sale (0% VAT, Net = Gross). If column D is blank, it's B2C -> UK VAT applies at 20%, backed *out* of the price actually charged (never added on top of it).

**Before moving on:**

- Confirm every row has data in every column A–N.
- **Never populate columns O–T** (Invoice date, Local currency, Exchange rate, or any "_local" amount column). These exist in the template but aren't part of Taxually's actual spec — populating them is what caused repeated "Exchange rate incorrect" rejections. Double check they're not just hidden; open the columns and visually confirm they're empty, since a hidden-but-populated column still uploads.
- Cross-check the row count in "Your data" against the row count of GB + paid rows in the raw month sheet, to catch anything missing.

### Phase 5: Update Exchange Rates

In the **GBP exchange rate** sheet, update the Start/End dates to cover this month (Excel/Sheets will pull the rates automatically). Set the start and end date a few days before/past the actual period end, to make sure a rate is available for the next business day after month-close.

### Phase 6: Create the Submission Copy & Submit

Duplicate the workbook within the same month's folder (File → Make a copy). Name it Taxually Monthly Data - [Month] 2026 (Submission). In this copy, **delete every sheet except "Your data"** -> this is the file that actually gets uploaded.

Open Taxually, find the correct month, and upload the Submission file. Review for any errors. Submit. **Deadline: the 8th of each month**, even though the actual UK VAT filing itself is quarterly.

### Known pitfalls (from real filing history)

- **Hidden ≠ empty.** Hiding columns O–T in the sheet you're working from doesn't stop their data going out when the file is passed along — a hidden column with data in it still submits.
- **FX values can look blank if the file is opened/saved outside Google Sheets.** The exchange rate lookups depend on a live Google Sheets function; opening the file in Excel or another tool can strip the cached numbers. Always do the exchange-rate step and final check from within Google Sheets itself.

### Fallback process: VAT Report → MTD Bridge

If Taxually is no longer in use, you can follow these steps above to create the document we need to upload your taxes to UK HMRC.

MTD Bridge operates on a quarterly basis so you'll need to have completed your monthly analysis above and summarize the totals together to be able to submit it through that platform.

1. Complete the "VAT Report tab" of each monthly workbook above with the numbers coming directly from the summary
   1. Calculate the VAT due on Sales -> Value is the sum of the Column BC "GBP Converted Gross" in each monthly
   2. Calculate Total Sales (exc) -> Value is the sum of the Column BE "GBP Net Sales"
2. Duplicate this [workbook](https://docs.google.com/spreadsheets/d/1NvaBfpZI0YppkMV6ono88GEYiDCRnJDv/edit?gid=1066211713#gid=1066211713) and create it for the quarter you are doing the submission for
3. Summarize the VAT due on Sales and Total Sales (exc) to get two complete numbers for the quarter.
4. Update them in the new worksheet you duplicated
5. Once the "VAT Report" tab is complete, copy the figures into the MTD 100% VAT Free Bridge program file for the actual HMRC submission

Download the software here <https://www.comsci.co.uk/100PcVatFreeBridge>

Watch the tutorial here <https://app.comsci.co.uk/doc/100PcVatFreeBridgeGuide/tutorial.html>

Once you open the software for the first time, it'll ask you some questions:

- Account Name: FlowFuse Inc.
- VAT Number: Get it from the HMRC website
- Flat Rate VAT Scheme: leave it unchecked.
- Look at 12 months from: January (THE YEAR YOUR ARE WORKING FROM)

1. Click on Data sources
2. Upload the file you prepared above.
3. Click on Prepare for the filing you're filling in
4. It should auto fill the fields. Verify the following:

- Box 1: VAT due on Sales
  - VAT due in reporting period on sales and other output
- Box 2: VAT due NI from EU
  - VAT due in reporting period on intra-community acquisitions of goods made in Northern Ireland from EU Member States -> **Always zero**
- Box 3: Total VAT due
  - Calculated automatically
- Box 4: VAT Reclaimable
  - VAT on all AP invoices -> **Always zero**
- Box 5: VAT to pay/claim
  - Calculated automatically
- Box 6: Total Sales (exc)
  - Total value of sales and other output excluding any VAT, only include sales within UK
- Box 7: Total Purchases (exc)
  - Total value of purchases and other input excluding any VAT, net value of purchases -> **Always zero**
- Box 8: Goods NI to EU (exc)
  - EU Sales through Northern Ireland only -> **Always zero**
- Box 9: Goods NI from EU (exc)
  - EU Purchases through Northern Ireland only -> **Always zero**

## Internal Documentation & Storage
All finalized tax filings, monthly financial packages, and signed vendor contracts are stored in [this folder in Google Drive](https://drive.google.com/drive/folders/1xtrbFJaAmwgF9VdWnvzztevXi1MUJDMR). Access is limited to the Accounting Team and Executive Leadership.
