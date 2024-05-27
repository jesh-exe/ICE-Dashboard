import { Component, OnInit, ViewChild } from "@angular/core";
import { Card } from "app/ice/about-us/card";
import { HomePageComponent } from "app/ice/about-us/home-page/home-page.component";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent implements OnInit {
  public contentHeader: object;
  cardView: Card[] = [];

  @ViewChild("blog") homepagecom: HomePageComponent;

  constructor() {}

  trackByFn(index, material) {
    return index; // or material.id
  }

  ngOnInit(): void {
    this.cardView.push(
      new Card(
        "High Performance Computing",
        "High Performance Computing (HPC) plays an important role in both scientific advancement and economic competitiveness of a nation - making production of scientific and industrial solutions faster, less expensive, and of higher quality. HPC is a key component in many applications: designing vehicles and airplanes; designing high-rise buildings and bridges; discovery of drugs; discovery and extraction of new energy sources like oil and natural gas; weather forecasting; and many more.",
        "odd"
      )
    );
    this.cardView.push(
      new Card(
        "Software development for Supercomputing Applications",
        "Software development for supercomputing applications involves crafting algorithms and programs tailored to exploit the immense computational power of supercomputers efficiently. It begins with analyzing the problem domain in collaboration with domain experts, followed by algorithm design optimized for parallel computation. Using programming models like MPI and OpenMP, developers code algorithms in languages such as C, C++, or Fortran, leveraging performance-oriented libraries like BLAS and FFTW. Optimization techniques like profiling and parallelization ensure maximum efficiency and scalability. Rigorous testing and validation guarantee the accuracy and reliability of the software. Deployment on supercomputing infrastructure and ongoing maintenance are essential for performance monitoring and issue resolution. Collaboration and documentation are crucial for sharing knowledge and best practices within the community. Overall, software development for supercomputing demands expertise in parallel programming, optimization, and collaboration to tackle complex computational challenges effectively.",
        "even"
      )
    );
    this.cardView.push(
      new Card(
        "Big Data Analysis",
        "Big data analysis involves the processing and analysis of vast volumes of data to extract valuable insights, patterns, and trends that can inform decision-making and drive innovation. It encompasses several stages, beginning with data collection from diverse sources such as sensors, social media, and enterprise systems. Once collected, the data undergoes preprocessing to clean, transform, and prepare it for analysis, addressing issues like missing values and inconsistencies.Next, advanced analytics techniques, including machine learning, data mining, and statistical analysis, are applied to uncover meaningful patterns and correlations within the data. These insights can be used for various applications, including business intelligence, predictive analytics, and personalized recommendations. Finally, the results of the analysis are visualized and communicated to stakeholders through reports, dashboards, and interactive visualizations, facilitating data-driven decision-making.Big data analysis requires expertise in data management, statistics, programming, and domain knowledge to effectively extract actionable insights from large and complex datasets. Additionally, scalable and efficient computational infrastructure and tools are essential to handle the volume, velocity, and variety of big data effectively.",
        "odd"
      )
    );
    this.cardView.push(
      new Card(
        "Structural Biology",
        "Structural biology is a multidisciplinary field focused on understanding the structure and function of biological macromolecules, such as proteins, nucleic acids, and complex assemblies, at atomic or molecular levels. It combines techniques from biology, chemistry, physics, and computational modeling to elucidate the three-dimensional structures of biomolecules and investigate their interactions and dynamics. Experimental methods like X-ray crystallography, nuclear magnetic resonance (NMR) spectroscopy, and cryo-electron microscopy (cryo-EM) are employed to determine the structures of biomolecules, providing insights into their roles in cellular processes and diseases. Computational approaches, including molecular dynamics simulations and protein structure prediction algorithms, complement experimental findings by modeling biomolecular structures and simulating their behavior under different conditions. Structural biology plays a crucial role in drug discovery, protein engineering, and understanding the molecular basis of diseases, facilitating the development of novel therapeutics and biotechnological applications.",
        "even"
      )
    );
    this.cardView.push(
      new Card(
        "Bioinformatics Activities",
        "The Bioinformatics Group at C-DAC leverages on the inherent technological expertise to delve into complex biological systems and develop an understanding of underlying processes by providing high throughput solutions and services. The group has a dual capability of expertise in advanced areas of research in computational biology along with understanding of High Performance Computing. The activities of the Bioinformatics Group are aimed towards acquiring in-depth knowledge and understanding the various strata of bio-complexity and hence include an entire spectrum of data analyses and essential research consumables.",
        "odd"
      )
    );
    this.cardView.push(
      new Card(
        "Cloud Computing",
        "C-DACs research focus in cloud computing includes design and development of Open source cloud middleware; virtualization and management tools; and end-to-end security solution for the cloud. A number of applications in C-DAC are being migrated to Cloud computing technology. These include hospital information systems, disaster recovery, telemedicine, HPC services, language services (like translation), e-governance applications, etc. Considering the related, but complimentary driving forces of grid and cloud computing disciplines, C-DAC is also exploring integration of grid and cloud computing.",
        "even"
      )
    );

    this.contentHeader = {
      headerTitle: "About Us",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "About Us",
            isLink: false,
          },
        ],
      },
    };
  }
}
