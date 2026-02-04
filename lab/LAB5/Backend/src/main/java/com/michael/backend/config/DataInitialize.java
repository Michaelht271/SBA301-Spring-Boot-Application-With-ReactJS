package com.michael.backend.config;

import com.michael.backend.pojo.Category;
import com.michael.backend.pojo.Orchid;
import com.michael.backend.services.impl.CategoryServiceImpl;
import com.michael.backend.services.impl.OrchidServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitialize {
	
	private final OrchidServiceImpl orchidService;
	private final CategoryServiceImpl categoryService;
	@Bean
	public CommandLineRunner initCommandLineRunner() {
		return args -> {
			// Tạo các Category
			Category category1 = new Category("Phalaenopsis");
			Category category2 = new Category("Cattleya");
			Category category3 = new Category("Dendrobium");
			Category category4 = new Category("Cymbidium");
			Category category5 = new Category("Vanda");
			Category category6 = new Category("Oncidium");
	
			
			// Sample Orchid 1
			Orchid orchid1 = new Orchid(
					"https://images.pexels.com/photos/1076233/pexels-photo-1076233.jpeg",
					true,
		
					"Beautiful moth orchid with white petals and elegant appearance. Perfect for indoor decoration.",
					true,
					"Moth Orchid"
			);
			
			// Sample Orchid 2
			Orchid orchid2 = new Orchid(
					"https://images.pexels.com/photos/31072343/pexels-photo-31072343.jpeg",
					true,
				
					"Vibrant purple cattleya orchid known for its fragrant blooms and showy flowers.",
					true,
					"Purple Cattleya"
			);
			
			// Sample Orchid 3
			Orchid orchid3 = new Orchid(
					"https://images.pexels.com/photos/6207449/pexels-photo-6207449.jpeg",
					true,
			
					"Exotic dendrobium orchid with delicate pink flowers arranged in sprays.",
					true,
					"Pink Dendrobium"
			);
			
			// Sample Orchid 4
			Orchid orchid4 = new Orchid(
					"https://images.pexels.com/photos/87016/orchid-flower-blossom-bloom-87016.jpeg",
					true,

					"Stunning blue vanda orchid with vibrant color and unique growing requirements.",
					false,
					"Blue Vanda"
			);
			
			// Sample Orchid 5
			Orchid orchid5 = new Orchid(
					"https://example.com/images/oncidium.jpg",
					true,
				
					"Dancing lady orchid with yellow blooms resembling tiny dancers in motion.",
					true,
					"Dancing Lady"
			);
			
			// Sample Orchid 6
			Orchid orchid6 = new Orchid(
					"https://images.pexels.com/photos/3699859/pexels-photo-3699859.jpeg",
					false,
				
					"Large cymbidium orchid with green and brown tones, suitable for cooler climates.",
					true,
					"Green Cymbidium"
			);
			
			// Sample Orchid 7
			Orchid orchid7 = new Orchid(
					"https://images.pexels.com/photos/11848194/pexels-photo-11848194.jpeg",
					true,
			
					"Lady's slipper orchid with unique pouch-shaped lip and exotic appearance.",
					true,
					"Lady's Slipper"
			);
			
			// Sample Orchid 8
			Orchid orchid8 = new Orchid(
					"https://example.com/images/miltonia.jpg",
					true,
				
					"Pansy orchid with flat-faced flowers in rich burgundy and white colors.",
					true,
					"Pansy Orchid"
			);
			
			// Sample Orchid 9
			Orchid orchid9 = new Orchid(
					"https://example.com/images/brassia.jpg",
					true,
			
					"Spider orchid with long, thin petals that resemble spider legs.",
					true,
					"Spider Orchid"
			);
			
			// Sample Orchid 10
			Orchid orchid10 = new Orchid(
					"https://example.com/images/zygopetalum.jpg",
					true,
			
					"Fragrant orchid with purple and green blooms and a distinctive pattern.",
					true,
					"Fragrant Zygo"
			);
			
			// Sample Orchid 11
			Orchid orchid11 = new Orchid(
					"https://example.com/images/epidendrum.jpg",
					false,
					"Reed orchid with clustered orange flowers, great for outdoor gardens.",
					true,
					"Orange Reed Orchid"
			);
			
			// Sample Orchid 12
			Orchid orchid12 = new Orchid(
					"https://example.com/images/masdevallia.jpg",
					true,
					"Kite orchid with triangular red blooms and compact growth habit.",
					true,
					"Red Kite Orchid"
			);
			
			// Sample Orchid 13
			Orchid orchid13 = new Orchid(
					"https://example.com/images/phalaenopsis-pink.jpg",
					true,
					"Delicate pink moth orchid with long-lasting blooms and easy care.",
					false,
					"Pink Moth Orchid"
			);
			
			// Sample Orchid 14
			Orchid orchid14 = new Orchid(
					"https://example.com/images/vanilla.jpg",
					true,
					"The vanilla orchid, famous for producing vanilla beans used in flavoring.",
					true,
					"Vanilla Orchid"
			);
			
			// Sample Orchid 15
			Orchid orchid15 = new Orchid(
					"https://example.com/images/ludisia.jpg",
					false,
					"Jewel orchid grown primarily for its beautiful dark foliage with pink veins.",
					true,
					"Jewel Orchid"
			);
			
			// Sample Orchid 16
			Orchid orchid16 = new Orchid(
					"https://example.com/images/psychopsis.jpg",
					true,
					"Butterfly orchid with dramatic yellow and brown markings resembling butterflies.",
					true,
					"Butterfly Orchid"
			);
			
			// Sample Orchid 17
			Orchid orchid17 = new Orchid(
					"https://example.com/images/maxillaria.jpg",
					true,
					"Coconut orchid with small yellow flowers that smell like coconut.",
					true,
					"Coconut Orchid"
			);
			
			// Sample Orchid 18
			Orchid orchid18 = new Orchid(
					"https://example.com/images/dracula.jpg",
					true,
					"Monkey face orchid with unusual flowers that resemble primate faces.",
					true,
					"Monkey Face Orchid"
			);
			
			// Sample Orchid 19
			Orchid orchid19 = new Orchid(
					"https://example.com/images/bletilla.jpg",
					false,
					"Hardy ground orchid with magenta flowers, suitable for temperate gardens.",
					true,
					"Chinese Ground Orchid"
			);
			
			// Sample Orchid 20
			Orchid orchid20 = new Orchid(
					"https://example.com/images/calanthe.jpg",
					true,
					"Terrestrial orchid with cascading white blooms and graceful appearance.",
					true,
					"White Calanthe"
			);
			
			// Insert all orchids to database
			
			
			category1.addOrchid(orchid1);
			category2.addOrchid(orchid2);
			category3.addOrchid(orchid3);
			category4.addOrchid(orchid4);
			category5.addOrchid(orchid5);
			category6.addOrchid(orchid6);
			category1.addOrchid(orchid7);
			category2.addOrchid(orchid8);
			category3.addOrchid(orchid9);
			category4.addOrchid(orchid10);
			category5.addOrchid(orchid11);
			category6.addOrchid(orchid12);
			category1.addOrchid(orchid13);
			category2.addOrchid(orchid14);
			category3.addOrchid(orchid15);
			category4.addOrchid(orchid16);
			category5.addOrchid(orchid17);
			category6.addOrchid(orchid18);
			category1.addOrchid(orchid19);
			category2.addOrchid(orchid20);
			
			categoryService.save(category1);
			categoryService.save(category2);
			categoryService.save(category3);
			categoryService.save(category4);
			categoryService.save(category5);
			categoryService.save(category6);
		};
	}
}