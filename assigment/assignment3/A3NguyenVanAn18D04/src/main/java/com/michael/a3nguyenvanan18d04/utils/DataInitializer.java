package com.michael.a3nguyenvanan18d04.utils;

import com.michael.a3nguyenvanan18d04.entites.Customer;
import com.michael.a3nguyenvanan18d04.entites.RoomInformation;
import com.michael.a3nguyenvanan18d04.entites.RoomType;
import com.michael.a3nguyenvanan18d04.enums.Role;
import com.michael.a3nguyenvanan18d04.enums.CustomerStatus;
import com.michael.a3nguyenvanan18d04.enums.RoomStatus;
import com.michael.a3nguyenvanan18d04.repository.RoomInformationRepository;
import com.michael.a3nguyenvanan18d04.repository.RoomTypeRepository;
import com.michael.a3nguyenvanan18d04.services.interfaces.CustomerService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Class khởi tạo dữ liệu mẫu khi ứng dụng khởi động
 * Tạo các tài khoản mặc định cho việc testing và development
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final CustomerService customerService;
    private final PasswordEncoder passwordEncoder;

    // Repositories for seeding RoomType and RoomInformation
    private final RoomTypeRepository roomTypeRepository;
    private final RoomInformationRepository roomInformationRepository;

    @Override
    @Transactional
    public void run(@Nonnull String... args) {
        log.info("Starting data initialization...");

        // Bạn có thể thêm kiểm tra nếu dữ liệu đã tồn tại thì không khởi tạo lại
        createAdminUser();
        createManagerUser();
        createRegularUsers();

        // Seed room types and rooms (idempotent-ish: only when empty)
        createRoomTypes();
        createRoomInformations();

        log.info("Data initialization completed successfully!");
    }

    /**
     * Tạo tài khoản ADMIN với full quyền
     */
    private void createAdminUser() {
        Customer admin = Customer.builder()
                .customerFullName("Admin User")
                .password(passwordEncoder.encode("Admin@123"))
                .emailAddress("admin@codebase.com")
                .telephone("0901234567")
                .customerBirthday(LocalDate.of(1990, 1, 1))
                .customerStatus(CustomerStatus.ACTIVE)
                .roles(Role.STAFF)
                .build();

        customerService.createCustomer(admin);
        log.info("Created ADMIN customer: {}", admin.getEmailAddress());
    }

    /**
     * Tạo tài khoản MANAGER
     */
    private void createManagerUser() {
        Customer manager = Customer.builder()
                .customerFullName("Manager User")
                .password(passwordEncoder.encode("Manager@123"))
                .emailAddress("manager@codebase.com")
                .telephone("0901234568")
                .customerBirthday(LocalDate.of(1990, 2, 1))
                .customerStatus(CustomerStatus.ACTIVE)
                .roles(Role.STAFF)
                .build();

        customerService.createCustomer(manager);
        log.info("Created MANAGER customer: {}", manager.getEmailAddress());
    }

    /**
     * Tạo các tài khoản USER thông thường
     */
    private void createRegularUsers() {
        Customer user1 = Customer.builder()
                .customerFullName("User One")
                .password(passwordEncoder.encode("User@123"))
                .emailAddress("user1@codebase.com")
                .telephone("0901234569")
                .customerBirthday(LocalDate.of(1995, 3, 1))
                .customerStatus(CustomerStatus.ACTIVE)
                .roles(Role.CUSTOMER)
                .build();
        customerService.createCustomer(user1);

        Customer user2 = Customer.builder()
                .customerFullName("User Two")
                .password(passwordEncoder.encode("User@123"))
                .emailAddress("user2@codebase.com")
                .telephone("0901234570")
                .customerBirthday(LocalDate.of(1996, 4, 1))
                .customerStatus(CustomerStatus.ACTIVE)
                .roles(Role.CUSTOMER)
                .build();
        customerService.createCustomer(user2);

        Customer user3 = Customer.builder()
                .customerFullName("Locked User")
                .password(passwordEncoder.encode("User@123"))
                .emailAddress("locked@codebase.com")
                .telephone("0901234571")
                .customerBirthday(LocalDate.of(1997, 5, 1))
                .customerStatus(CustomerStatus.INACTIVE) // represent locked/disabled
                .roles(Role.CUSTOMER)
                .build();
        customerService.createCustomer(user3);

        Customer user4 = Customer.builder()
                .customerFullName("Disabled User")
                .password(passwordEncoder.encode("User@123"))
                .emailAddress("disabled@codebase.com")
                .telephone("0901234572")
                .customerBirthday(LocalDate.of(1998, 6, 1))
                .customerStatus(CustomerStatus.INACTIVE)
                .roles(Role.CUSTOMER)
                .build();
        customerService.createCustomer(user4);

        log.info("Created 4 regular customers (user1, user2, lockeduser, disableduser) with password: User@123");
    }

    /**
     * Seed some RoomType entries if repository is empty
     */
    private void createRoomTypes() {
        if (roomTypeRepository.count() > 0) {
            log.info("RoomType table already contains data, skipping seeding.");
            return;
        }

        RoomType single = RoomType.builder()
                .roomTypeName("Single")
                .roomTypeDescription("Single room with one bed, suitable for solo travelers.")
                .roomTypeNote("Basic amenities included")
                .build();

        RoomType doubleRoom = RoomType.builder()
                .roomTypeName("Double")
                .roomTypeDescription("Double room with two beds or one double bed, for two guests.")
                .roomTypeNote("Includes breakfast")
                .build();

        RoomType deluxe = RoomType.builder()
                .roomTypeName("Deluxe")
                .roomTypeDescription("Spacious deluxe room with sea view and premium facilities.")
                .roomTypeNote("Higher floor")
                .build();

        roomTypeRepository.saveAll(List.of(single, doubleRoom, deluxe));
        log.info("Seeded {} room types.", 3);
    }

    /**
     * Seed some RoomInformation entries and link them to existing RoomType
     */
    private void createRoomInformations() {
        if (roomInformationRepository.count() > 0) {
            log.info("RoomInformation table already contains data, skipping seeding.");
            return;
        }

        // Load types from DB (assume seeded above)
        List<RoomType> types = roomTypeRepository.findAll();

        Optional<RoomType> singleOpt = types.stream().filter(t -> "Single".equalsIgnoreCase(t.getRoomTypeName())).findFirst();
        Optional<RoomType> doubleOpt = types.stream().filter(t -> "Double".equalsIgnoreCase(t.getRoomTypeName())).findFirst();
        Optional<RoomType> deluxeOpt = types.stream().filter(t -> "Deluxe".equalsIgnoreCase(t.getRoomTypeName())).findFirst();

        // Create a few rooms for each type if available
        if (singleOpt.isPresent()) {
            RoomType single = singleOpt.get();
            RoomInformation r101 = RoomInformation.builder()
                    .roomNumber("101")
                    .roomDetailDescription("Cozy single room on 1st floor")
                    .roomMaxCapacity(1)
                    .roomStatus(RoomStatus.AVAILABLE)
                    .roomPricePerDay(3_000_000.0)
                    .build();

            RoomInformation r102 = RoomInformation.builder()
                    .roomNumber("102")
                    .roomDetailDescription("Single room with city view")
                    .roomMaxCapacity(1)
                    .roomStatus(RoomStatus.AVAILABLE)
                    .roomPricePerDay(3_200_000.0)
                    .build();

            // Attach to parent and save parent to cascade persist children
            single.addRoomInformation(r101);
            single.addRoomInformation(r102);
            roomTypeRepository.save(single);
			
        }

        if (doubleOpt.isPresent()) {
            RoomType dbl = doubleOpt.get();
            RoomInformation r201 = RoomInformation.builder()
                    .roomNumber("201")
                    .roomDetailDescription("Double room, comfortable for two")
                    .roomMaxCapacity(2)
                    .roomStatus(RoomStatus.AVAILABLE)
                    .roomPricePerDay(5_000_000.0)
                    .build();

            RoomInformation r202 = RoomInformation.builder()
                    .roomNumber("202")
                    .roomDetailDescription("Double room with balcony")
                    .roomMaxCapacity(2)
                    .roomStatus(RoomStatus.AVAILABLE)
                    .roomPricePerDay(5_500_000.0)
                    .build();

            dbl.addRoomInformation(r201);
            dbl.addRoomInformation(r202);
            roomTypeRepository.save(dbl);
        }

        if (deluxeOpt.isPresent()) {
            RoomType d = deluxeOpt.get();
            RoomInformation r301 = RoomInformation.builder()
                    .roomNumber("301")
                    .roomDetailDescription("Deluxe room with sea view and king-size bed")
                    .roomMaxCapacity(2)
                    .roomStatus(RoomStatus.AVAILABLE)
                    .roomPricePerDay(120.0)
                    .build();

            d.addRoomInformation(r301);
            roomTypeRepository.save(d);
        }

        log.info("Seeded RoomInformation entries.");
    }
}
