import { Component, OnInit } from '@angular/core';
import * as Circos from 'circos';
import * as d3 from 'd3';

@Component({
  selector: 'app-circos-graph',
  templateUrl: './circos-graph.component.html',
  styleUrls: ['./circos-graph.component.scss']
})
export class CircosGraphComponent implements OnInit {

  constructor() {

  }
  private data = [
    { "Framework": "Vue", "Stars": "166443", "Released": "2014" },
    { "Framework": "React", "Stars": "150793", "Released": "2013" },
    { "Framework": "Angular", "Stars": "62342", "Released": "2016" },
    { "Framework": "Backbone", "Stars": "27647", "Released": "2010" },
    { "Framework": "Ember", "Stars": "21471", "Released": "2011" },
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  public configuration = {
    innerRadius: 250,
    outerRadius: 300,
    cornerRadius: 10,
    gap: 0.04, // in radian
    labels: {
      display: true,
      position: 'center',
      size: '14px',
      color: '#000000',
      radialOffset: 20,
    },
    ticks: {
      display: true,
      color: 'grey',
      spacing: 10000000,
      labels: true,
      labelSpacing: 10,
      labelSuffix: 'Mb',
      labelDenominator: 1000000,
      labelDisplay0: true,
      labelSize: '10px',
      labelColor: '#000000',
      labelFont: 'default',
      majorSpacing: 5,
      size: {
        minor: 2,
        major: 5,
      }
    },
    events: {}
  };

  public data1 = [
    { len: 31, color: "#8dd3c7", label: "January", id: "january" },
    { len: 28, color: "#ffffb3", label: "February", id: "february" },
    { len: 31, color: "#bebada", label: "March", id: "march" },
    { len: 30, color: "#fb8072", label: "April", id: "april" },
    { len: 31, color: "#80b1d3", label: "May", id: "may" },
    { len: 30, color: "#fdb462", label: "June", id: "june" },
    { len: 31, color: "#b3de69", label: "July", id: "july" },
    { len: 31, color: "#fccde5", label: "August", id: "august" },
    { len: 30, color: "#d9d9d9", label: "September", id: "september" },
    { len: 31, color: "#bc80bd", label: "October", id: "october" },
    { len: 30, color: "#ccebc5", label: "November", id: "november" },
    { len: 31, color: "#ffed6f", label: "December", id: "december" }
  ];

  public myCircos = new Circos({
    container: '#chart',
    width: 500,
    height: 500,
  });

  ngOnInit(): void {
    console.log("Circos");
    this.myCircos.layout(this.data1, this.configuration);
    this.createSvg();
    this.drawPlot();
  }

  click() {
    console.log("Clicked");
    this.myCircos.render();
  }
  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
      .domain([2009, 2017])
      .range([0, this.width]);
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.Released))
      .attr("cy", d => y(d.Stars))
      .attr("r", 7)
      .style("opacity", .5)
      .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
      .data(this.data)
      .enter()
      .append("text")
      .text(d => d.Framework)
      .attr("x", d => x(d.Released))
      .attr("y", d => y(d.Stars))
  }
}
