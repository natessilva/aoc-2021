package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strings"
)

func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var columns [][]bool
	numCols := 0
	for scanner.Scan() {
		text := scanner.Text()
		bits := splitLine(text)
		if columns == nil {
			numCols = len(bits)
			columns = make([][]bool, numCols)
		}
		for i, v := range bits {
			columns[i] = append(columns[i], toBool(v))
		}
	}

	gamma := 0
	epsilon := 0
	for i, _ := range columns {
		col := columns[numCols-1-i]
		if mostCommon(col) {
			gamma += int(math.Pow(2, float64(i)))
		} else {
			epsilon += int(math.Pow(2, float64(i)))

		}
	}
	fmt.Println(gamma * epsilon)
}

func splitLine(line string) []string {
	return strings.Split(line, "")
}

func toBool(v string) bool {
	return v == "1"
}

func mostCommon(vals []bool) bool {
	trues := 0
	for _, v := range vals {
		if v {
			trues++
		}
	}
	return trues > len(vals)/2
}
