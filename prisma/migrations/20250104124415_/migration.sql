-- CreateTable
CREATE TABLE `Rak` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buku` (
    `id` VARCHAR(191) NOT NULL,
    `nomor` VARCHAR(191) NULL,
    `nama` VARCHAR(191) NOT NULL,
    `idRak` VARCHAR(191) NOT NULL,
    `dipinjam` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peminjaman` (
    `id` VARCHAR(191) NOT NULL,
    `idBuku` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `waktu` VARCHAR(191) NOT NULL,
    `namaBuku` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kunjungan` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `waktu` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Buku` ADD CONSTRAINT `Buku_idRak_fkey` FOREIGN KEY (`idRak`) REFERENCES `Rak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
