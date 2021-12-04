package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {

	bytes, _ := ioutil.ReadFile("./input.txt")
	input := string(bytes)
	sections := strings.Split(input, "\n\n")
	header := sections[0]
	draws := strings.Split(header, ",")
	body := sections[1:]

	boards := make([][][]string, len(body))
	marks := make([][][]bool, len(body))
	for i, board := range body {
		lines := strings.Split(board, "\n")
		for _, line := range lines {
			values := filter(strings.Split(line, " "), func(x string) bool {
				return x != ""
			})
			lineMarks := make([]bool, len(values))
			boards[i] = append(boards[i], values)
			marks[i] = append(marks[i], lineMarks)
		}
	}

	markBoard := func(i int, val string) {
		for boardIndex, board := range boards {
			for row, line := range board {
				for col, boardValue := range line {
					if val == boardValue {
						marks[boardIndex][row][col] = true
					}
				}
			}
		}
	}

	requiredWins := len(boards)
	winners := make(map[int]bool)

	for _, draw := range draws {
		for i, _ := range boards {
			markBoard(i, draw)
		}

		for bi, board := range marks {
			if isWinner(board) {
				if winner := winners[bi]; winner {
					continue
				}
				drawNum, _ := strconv.Atoi(draw)
				winners[bi] = true
				requiredWins--
				if requiredWins == 0 {
					su := sumUnmarked(boards[bi], board)
					fmt.Println("winner", su, drawNum)
					fmt.Println(su * drawNum)
					return

				} else {
					fmt.Println("early winner")
				}
			}
		}

	}
}

func sumUnmarked(board [][]string, marked [][]bool) int {
	unMarked := 0
	for i, line := range board {
		for j, val := range line {
			mark := marked[i][j]
			num, _ := strconv.Atoi(val)
			if !mark {
				unMarked += num
			}
		}
	}
	return unMarked
}

func isWinner(board [][]bool) bool {
	for _, line := range board {
		fmt.Println(line)
	}
	for _, line := range board {
		if every(line) {
			return true
		}
	}
	for col := 0; col < len(board[0]); col++ {
		possible := true
		for row := 0; row < len(board); row++ {
			if !board[row][col] {
				possible = false
				break
			}
		}
		if !possible {
			break
		}
		return true
	}
	return false
}

func every(in []bool) bool {
	for _, v := range in {
		if !v {
			return false
		}
	}
	return true
}

func filter(xs []string, fn func(string) bool) []string {
	res := make([]string, 0, len(xs))
	for _, x := range xs {
		if fn(x) {
			res = append(res, x)
		}
	}
	return res
}

func splitLine(line string) []string {
	return strings.Split(line, "")
}
