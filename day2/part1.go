package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	lines := make([][]string, 0)
	for scanner.Scan() {
		lines = append(lines, splitLine(scanner.Text()))
	}
	x := 0
	y := 0
	for _, v := range lines {
		val, err := strconv.Atoi(v[1])
		if err != nil {
			panic(err)
		}
		switch v[0] {
		case "forward":
			x += val
		case "down":
			y += val
		case "up":
			y -= val
		}
	}
	fmt.Println(x * y)
}

func splitLine(line string) []string {
	return strings.Split(line, " ")
}
