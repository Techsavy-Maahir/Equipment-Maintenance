ALTER TABLE "Equipment"
ADD COLUMN "purchaseDate" TIMESTAMP(3),
ADD COLUMN "purchaseCost" DECIMAL(12,2),
ADD COLUMN "warrantyStartDate" TIMESTAMP(3),
ADD COLUMN "warrantyExpiryDate" TIMESTAMP(3);
