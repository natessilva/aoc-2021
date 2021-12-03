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
	var allBits [][]string
	for scanner.Scan() {
		text := scanner.Text()
		bits := splitLine(text)
		allBits = append(allBits, bits)
	}

	ox := allBits
	for i := 0; i < len(allBits[0]); i++ {
		col := make([]bool, 0)
		for _, bits := range ox {
			bit := toBool(bits[i])
			col = append(col, bit)
		}
		mc := mostCommon(col)
		newOx := make([][]string, 0)
		if len(ox) == 1 {
			break
		}
		for _, bits := range ox {
			bit := toBool(bits[i])
			if bit == mc {
				newOx = append(newOx, bits)
			}
		}
		ox = newOx
	}
	co2 := allBits
	for i := 0; i < len(allBits[0]); i++ {
		col := make([]bool, 0)
		for _, bits := range co2 {
			bit := toBool(bits[i])
			col = append(col, bit)
		}
		lc := leastCommon(col)
		newCo2 := make([][]string, 0)
		if len(co2) == 1 {
			break
		}
		for _, bits := range co2 {
			bit := toBool(bits[i])
			if bit == lc {
				newCo2 = append(newCo2, bits)
			}
		}
		co2 = newCo2
		if len(ox) == 1 && len(co2) == 1 {
			break
		}
	}
	fmt.Println(toNumber(ox[0]) * toNumber(co2[0]))
}

func splitLine(line string) []string {
	return strings.Split(line, "")
}

func toBool(v string) bool {
	return v == "1"
}

func toNumber(v []string) int {
	num := 0
	for i, _ := range v {
		bit := toBool(v[len(v)-1-i])
		if bit {
			num += int(math.Pow(2, float64(i)))
		}
	}
	return num
}

func mostCommon(vals []bool) bool {
	trues := 0
	for _, v := range vals {
		if v {
			trues++
		}
	}
	falses := len(vals) - trues
	return trues >= falses
}

func leastCommon(vals []bool) bool {
	trues := 0
	for _, v := range vals {
		if v {
			trues++
		}
	}
	falses := len(vals) - trues
	return trues < falses
}
